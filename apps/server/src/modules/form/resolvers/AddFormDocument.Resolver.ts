import { Resolver, Arg, Mutation, Ctx, Authorized } from 'type-graphql';

import Group from '@module/group/Group.Entity';
import User from '@module/user/User.Entity';

import { GraphQLContext } from '~/types/GraphQLContext';
import Form from '../Form.Entity';
import { addFormDocument } from '../utils/addFormDocument';

@Resolver()
export default class AddFormDocumentResolver {
  @Authorized()
  @Mutation(() => Boolean)
  async addFormDocument(
    @Arg('groupName') groupName: string,
    @Arg('formName') formName: string,
    @Arg('document') document: string,
    @Ctx() { userId }: GraphQLContext
  ): Promise<boolean> {
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
      return false;
    }

    return addFormDocument(form, document);
  }
}
