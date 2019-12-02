import { Resolver, Arg, Query, Ctx, Authorized, Int } from 'type-graphql';
import { getConnection } from 'typeorm';

import { CountDisplay, ValueCondition, FormDisplays } from '@form/interfaces/types/FormData';

import Group from '@module/group/Group.Entity';
import User from '@module/user/User.Entity';

import { GraphQLContext } from '~/types/GraphQLContext';

import Form from '../Form.Entity';
import { parseDataDisplay } from '../utils/parseDataDisplay';

const booleanCondition = (type: string) => {
  if (type === '&') return 'and';
  if (type === '|') return 'or';
  return '';
};

const getCountFromDisplay = async (table: string, display: CountDisplay): Promise<number> => {
  const cond = display.conditions
    .map((c) => {
      if (c.type === '&' || c.type === '|') {
        return `${booleanCondition(c.type)}`;
      }
      return `${(c as ValueCondition).fieldName}${c.type}'${(c as ValueCondition).data}'`;
    })
    .join(' ');

  const sql = `select count(*) from ${table}_Form where ${cond};`;

  const result = await getConnection().query(sql);

  return result[0].count;
};

const parseDisplayTree = async (table: string, display: FormDisplays): Promise<number> => {
  if (display.type === 'count') return getCountFromDisplay(table, display);
  switch (display.operation) {
    case '+':
      return (
        (await parseDisplayTree(table, display.left)) +
        (await parseDisplayTree(table, display.right))
      );
    case '-':
      return (
        (await parseDisplayTree(table, display.left)) -
        (await parseDisplayTree(table, display.right))
      );
    case '*':
      return (
        (await parseDisplayTree(table, display.left)) *
        (await parseDisplayTree(table, display.right))
      );
    case '/':
      return (
        (await parseDisplayTree(table, display.left)) /
        (await parseDisplayTree(table, display.right))
      );
    case '%':
      return (
        (await parseDisplayTree(table, display.left)) %
        (await parseDisplayTree(table, display.right))
      );
    default:
      throw new Error('Internal Server Calculation Error');
  }
};

@Resolver()
export default class GetFormDataResolver {
  @Authorized()
  @Query(() => String)
  async getFormData(
    @Arg('gid', () => Int) groupId: number,
    @Arg('fid', () => Int) formId: number,
    @Ctx() { userId }: GraphQLContext
  ): Promise<string> {
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
      return '';
    }
    const status = await Promise.all(form.dataDisplay.map((d) => parseDataDisplay(d.display)));
    if (!status.every((b) => b)) {
      return '';
    }
    const data: any[] = [];
    await Promise.all(
      form.dataDisplay.map(async (d, i) => {
        const count = await parseDisplayTree(form.name, d.display);
        data[i] = { [d.name]: count };
      })
    );

    return JSON.stringify(data);
  }
}
