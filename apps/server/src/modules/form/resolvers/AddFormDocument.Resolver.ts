import { Resolver, Arg, Mutation, Ctx, Authorized, Int } from 'type-graphql';

import Group from '@module/group/Group.Entity';
import User from '@module/user/User.Entity';

import { GraphQLContext } from '~/types/GraphQLContext';
import Form from '../Form.Entity';
import { addFormDocument } from '../utils/addFormDocument';

@Resolver()
export default class AddFormDocumentResolver {
  @Authorized()
  @Mutation(() => Boolean, { description: 'Add a document to a form, Auth required' })
  async addFormDocument(
    @Arg('gid', () => Int, { description: 'Group ID' }) groupId: number,
    @Arg('fid', () => Int, { description: 'Form ID' }) formId: number,
    @Arg('document', { description: 'The Document to add to the form' }) document: string,
    @Ctx() { userId }: GraphQLContext
  ): Promise<boolean> {
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
      return false;
    }

    return addFormDocument(form, document);
  }
}
