import * as ModuleAlias from 'module-alias';

ModuleAlias.addAliases({
  '@constants': __dirname + '/constants',
  '@interfaces': __dirname + '/interfaces',
  '@middlewares': __dirname + '/middlewares',
  '@modules': __dirname + '/modules',
  '@repositories': __dirname + '/repositories',
  '@routers': __dirname + '/routers',
  '@utils': __dirname + '/utils',
});
