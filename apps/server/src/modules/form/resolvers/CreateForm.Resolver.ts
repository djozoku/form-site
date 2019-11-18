import { Resolver, Arg, Mutation, Ctx } from 'type-graphql';

import Group from '@module/group/Group.Entity';
import User from '@module/user/User.Entity';

import { GraphQLContext } from '~/types/GraphQLContext';
import Form from '../Form.Entity';
import { createForm } from '../utils/createForm';
import { parseFormData } from '../utils/parseFormData';

@Resolver()
export default class CreateFormResolver {
  @Mutation(() => Boolean)
  async createForm(
    @Arg('groupName') groupName: string,
    @Arg('formName') formName: string,
    // FIXME: use a real typescript type
    @Arg('formData') formData: string,
    @Ctx() { userId }: GraphQLContext
  ): Promise<boolean> {
    const user = await User.findOne(userId);
    const group = await Group.findOne({ where: { name: groupName }, relations: ['owner'] });

    if (
      !user ||
      !group ||
      group.owner!.id !== user.id ||
      (await Form.findOne({ where: { name: formName } }))
    ) {
      return false;
    }

    const parsedData = await parseFormData(formData);

    if (!parsedData) return false;

    return createForm(group, formName, parsedData);
  }
}
