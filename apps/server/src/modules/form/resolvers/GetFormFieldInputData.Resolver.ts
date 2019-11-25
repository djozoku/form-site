import { Resolver, Arg, Ctx, Query, Authorized } from 'type-graphql';

import Group from '@module/group/Group.Entity';
import User from '@module/user/User.Entity';

import { GraphQLContext } from '~/types/GraphQLContext';
import Form from '../Form.Entity';
import FormFieldData from './FormFieldData.Type';

@Resolver()
export default class GetFormFieldInputDataResolver {
  @Authorized()
  @Query(() => [FormFieldData], { nullable: true })
  async getFormFieldInputData(
    @Arg('groupName') groupName: string,
    @Arg('formName') formName: string,
    @Ctx() { userId }: GraphQLContext
  ): Promise<FormFieldData[] | null> {
    const user = await User.findOne(userId);
    const group = await Group.findOne({
      where: { name: groupName },
      relations: ['members', 'owner', 'forms']
    });
    const form = await Form.findOne({ where: { name: formName } });

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
