import { Resolver, Arg, Mutation, Ctx, Authorized, Int } from 'type-graphql';

import Group from '@module/group/Group.Entity';
import User from '@module/user/User.Entity';

import { GraphQLContext } from '~/types/GraphQLContext';
import Form from '../Form.Entity';
import { removeForm } from '../utils/removeForm';

@Resolver()
export default class DeleteFormResolver {
  @Authorized()
  @Mutation(() => Boolean, {
    description: 'Delete a form owned by the current user, Auth required'
  })
  async deleteForm(
    @Arg('gid', () => Int, { description: 'Group ID' }) groupId: number,
    @Arg('fid', () => Int, { description: 'Form ID' }) formId: number,
    @Ctx() { userId }: GraphQLContext
  ): Promise<boolean> {
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
      return false;
    }

    group.forms = group.forms!.filter((f) => f.id !== form.id);

    await group.save();

    await form.remove();
    await removeForm(form.name);

    return true;
  }
}
