import { Resolver, Arg, Query, Ctx } from 'type-graphql';
import { getConnection } from 'typeorm';

import Group from '@module/group/Group.Entity';
import User from '@module/user/User.Entity';

import { GraphQLContext } from '~/types/GraphQLContext';
import Form from '../Form.Entity';
import { parseDataDisplay } from '../utils/parseDataDisplay';

// TODO: complete this
@Resolver()
export default class GetFormDataResolver {
  @Query(() => String, { nullable: true })
  async getFormData(
    @Arg('groupName') groupName: string,
    @Arg('formName') formName: string,
    @Ctx() { userId }: GraphQLContext
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

    parseDataDisplay(form.dataDisplay[0].display);
    getConnection();

    return null;
  }
}
