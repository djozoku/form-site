import { Resolver, Arg, Query, Ctx } from 'type-graphql';
import { getConnection } from 'typeorm';

import Group from '@module/group/Group.Entity';
import User from '@module/user/User.Entity';

import { GraphQLContext } from '~/types/GraphQLContext';
import Form from '../Form.Entity';

@Resolver()
export default class GetFormRawDataResolver {
  @Query(() => String, { nullable: true })
  async getFormRawData(
    @Arg('groupName') groupName: string,
    @Arg('formName') formName: string,
    @Ctx() { userId }: GraphQLContext,
    @Arg('skip') skip: number = 0,
    @Arg('take') take: number = 20
  ): Promise<string | null> {
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
    const query = `SELECT * FROM ${formName}_Form WHERE ID > ${skip} AND ID <= ${skip + take};`;
    const result = await getConnection().query(query);
    if (!result) return null;
    return JSON.stringify(result.rows);
  }
}
