import { Query, Resolver, Ctx } from 'type-graphql';
// import User from '../../entity/User';
import { MyContext } from '../../types/MyContext';

@Resolver()
export default class MeResolver {
  @Query(() => String, { nullable: true })
  async me(@Ctx() { req }: MyContext) {
    // return User.findOne(req.session.userid);
    return 'Hello';
  }
}
