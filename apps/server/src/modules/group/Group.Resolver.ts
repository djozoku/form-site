import { Query, Arg, Resolver, Args, Authorized, Int } from 'type-graphql';
import Group from './Group.Entity';
import PaginationArgs from '~/utils/PaginationArgs';

@Resolver()
export default class GroupResolver {
  @Authorized()
  @Query(() => Group, { nullable: true })
  async group(@Arg('groupId', () => Int) id: number) {
    return Group.findOne(id, { relations: ['owner', 'members', 'forms'] });
  }

  @Authorized()
  @Query(() => [Group], { nullable: true })
  async groups(@Args() { skip, take }: PaginationArgs) {
    return Group.find({ skip, take, relations: ['owner', 'members', 'forms'] });
  }
}
