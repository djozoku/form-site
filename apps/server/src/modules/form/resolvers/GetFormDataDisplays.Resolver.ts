import { Resolver, Arg, Ctx, Authorized, Int, Query } from 'type-graphql';

import Group from '@module/group/Group.Entity';
import User from '@module/user/User.Entity';

import { GraphQLContext } from '~/types/GraphQLContext';
import Form from '../Form.Entity';

@Resolver()
export default class GetFormDataDisplaysResolver {
  @Authorized()
  @Query(() => String)
  async getFormDataDisplays(
    @Arg('gid', () => Int) groupId: number,
    @Arg('fid', () => Int) formId: number,
    @Ctx() { userId }: GraphQLContext
  ): Promise<string> {
    const user = await User.findOne(userId);
    const group = await Group.findOne({
      where: { id: groupId },
      relations: ['owner', 'forms']
    });
    const form = await Form.findOne({ where: { id: formId } });

    if (
      !user ||
      !group ||
      group.owner!.id !== user.id ||
      !form ||
      !group.forms!.find((f) => f.id === form.id)
    ) {
      return '';
    }

    return JSON.stringify(form.dataDisplay);
  }
}