import { Resolver, Arg, Mutation, Ctx } from 'type-graphql';

import Group from '@module/group/Group.Entity';
import User from '@module/user/User.Entity';

import { GraphQLContext } from '~/types/GraphQLContext';
import Form from '../Form.Entity';
import { removeForm } from '../utils/removeForm';

@Resolver()
export default class DeleteFormResolver {
  @Mutation(() => Boolean)
  async deleteForm(
    @Arg('groupName') groupName: string,
    @Arg('formName') formName: string,
    @Ctx() { userId }: GraphQLContext
  ): Promise<boolean> {
    const user = await User.findOne(userId);
    const group = await Group.findOne({
      where: { name: groupName },
      relations: ['owner', 'forms']
    });
    const form = await Form.findOne({ where: { name: formName } });

    if (
      !user ||
      !group ||
      group.owner!.id !== user.id ||
      !form ||
      !group.forms!.find((f) => f.id === form.id)
    ) {
      return false;
    }

    group.forms = group.forms!.filter((f) => f.name !== formName);

    await group.save();

    await form.remove();
    await removeForm(formName);

    return true;
  }
}
