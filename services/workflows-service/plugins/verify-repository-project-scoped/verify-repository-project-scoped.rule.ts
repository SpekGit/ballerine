import { Rule } from 'eslint';

const rule: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Check if repository methods recieve projectId: TProjectId',
      category: 'Best Practices',
      recommended: true,
    },
  },
  create: (context: Rule.RuleContext) => {
    const isRepository =
      /^(?!.*\/(customer|data-migration)\.repository\.(ts|js)$).*\.repository\.(ts|js)$/.test(
        // Using deprecated .getFilename here because relevant context.filename returns undefined
        context.getFilename(),
      );

    const UNSCOPED_METHOD_NAMES = ['unscoped', 'create', 'update'];

    return {
      MethodDefinition: (node: any) => {
        if (!isRepository || node.key.name === 'constructor') return;

        const isUnscoped = UNSCOPED_METHOD_NAMES.some((name: string) =>
          node.key.name.toLowerCase().includes(name),
        );

        if (isUnscoped) return;

        const isProjectIdsIncluded = node.value.params.some(
          (param: any) => param.type === 'Identifier' && param.name.toLowerCase().includes('projectid'),
        );

        if (!isProjectIdsIncluded) {
          context.report({
            node,
            message: 'Scoped repository method should include projectId(s): TProjectId',
          });
        }
      },
    };
  },
};

export default rule;
