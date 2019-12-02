import { Resolver, Arg, Query, Ctx, Args, Authorized, Int } from 'type-graphql';
import { getConnection } from 'typeorm';

import Group from '@module/group/Group.Entity';
import User from '@module/user/User.Entity';

import { GraphQLContext } from '~/types/GraphQLContext';
import Form from '../Form.Entity';
import PaginationArgs from '~/utils/PaginationArgs';

@Resolver()
export default class GetFormRawDataResolver {
  @Authorized()
  @Query(() => String, { nullable: true })
  async getFormRawData(
    @Arg('gid', () => Int) groupId: number,
    @Arg('fid', () => Int) formId: number,
    @Ctx() { userId }: GraphQLContext,
    @Args() { skip, take }: PaginationArgs
  ): Promise<string | null> {
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
    const query = `SELECT * FROM ${form.name}_Form WHERE ID > ${skip} AND ID <= ${skip + take};`;
    const result = await getConnection().query(query);
    if (!result) return null;
    return JSON.stringify(result.rows);
  }
}
