import { Query, Arg, Resolver, Args, Authorized } from 'type-graphql';
import Form from '../Form.Entity';
import PaginationArgs from '~/utils/PaginationArgs';

@Resolver()
export default class FormResolver {
  @Authorized()
  @Query(() => Form, { nullable: true })
  async form(@Arg('formId') id: number) {
    return Form.findOne(id, { relations: ['owner'] });
  }

  @Authorized()
  @Query(() => [Form], { nullable: true })
  async forms(@Args() { skip, take }: PaginationArgs) {
    return Form.find({ skip, take, relations: ['owner'] });
  }
}
