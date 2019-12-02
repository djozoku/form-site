import { Resolver, Arg, Mutation, Ctx, Authorized, Int } from 'type-graphql';

import Group from '@module/group/Group.Entity';
import User from '@module/user/User.Entity';

import { GraphQLContext } from '~/types/GraphQLContext';
import Form from '../Form.Entity';
import { createForm } from '../utils/createForm';
import { parseFormData } from '../utils/parseFormData';

@Resolver()
export default class CreateFormResolver {
  @Authorized()
  @Mutation(() => Int)
  async createForm(
    @Arg('groupName') groupName: string,
    @Arg('formName') formName: string,
    // FIXME: use a real typescript type
    @Arg('formData') formData: string,
    @Ctx() { userId }: GraphQLContext
  ): Promise<number> {
    const user = await User.findOne(userId);
    const group = await Group.findOne({ where: { name: groupName }, relations: ['owner'] });

    if (
      !user ||
      !group ||
      group.owner!.id !== user.id ||
      (await Form.findOne({ where: { name: formName } }))
    ) {
      return 0;
    }

    const parsedData = await parseFormData(formData);

    if (!parsedData) return 0;

    return (await createForm(group, formName, parsedData)).id;
  }
}
