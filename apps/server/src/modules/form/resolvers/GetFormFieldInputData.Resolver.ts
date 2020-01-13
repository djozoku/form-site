import { Resolver, Arg, Ctx, Query, Authorized, Int } from 'type-graphql';

import Group from '@module/group/Group.Entity';
import User from '@module/user/User.Entity';

import { GraphQLContext } from '~/types/GraphQLContext';
import Form from '../Form.Entity';
import FormFieldData from './FormFieldData.Type';

@Resolver()
export default class GetFormFieldInputDataResolver {
  @Authorized()
  @Query(() => [FormFieldData], {
    nullable: true,
    description: 'Get input data for a form with an id, Auth required'
  })
  async getFormFieldInputData(
    @Arg('gid', () => Int, { description: 'Group ID' }) groupId: number,
    @Arg('fid', () => Int, { description: 'Form ID' }) formId: number,
    @Ctx() { userId }: GraphQLContext
  ): Promise<FormFieldData[] | null> {
    const user = await User.findOne(userId);
    const group = await Group.findOne({
      where: { id: groupId },
      relations: ['members', 'owner', 'forms']
    });
    const form = await Form.findOne({ where: { id: formId } });

    if (
      !user ||
      !group ||
      !form ||
      !(group.members!.find((m) => m.id === user.id) || group.owner!.id === user.id) ||
      !group.forms!.find((f) => f.id === form.id)
    ) {
      return null;
    }

    return form.fields;
  }
}
