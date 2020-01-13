import { Query, Arg, Resolver, Args, Authorized, Int } from 'type-graphql';
import Group from './Group.Entity';
import PaginationArgs from '~/utils/PaginationArgs';

@Resolver()
export default class GroupResolver {
  @Authorized()
  @Query(() => Group, { nullable: true, description: 'Find one group with id, Auth required' })
  async group(@Arg('groupId', () => Int, { description: 'Group ID' }) id: number) {
    return Group.findOne(id, { relations: ['owner', 'members', 'forms'] });
  }

  @Authorized()
  @Query(() => [Group], { nullable: true, description: 'Get a list of groups, Auth required' })
  async groups(@Args() { skip, take }: PaginationArgs) {
    return Group.find({ skip, take, relations: ['owner', 'members', 'forms'] });
  }
}
