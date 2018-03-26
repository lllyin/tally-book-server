const Router = require('koa-router');
const models = require('../models');

const RecordModel = models.getModel('record');
const recordRouter = new Router({
  prefix: '/api',
});


// GET:record list
recordRouter.get('/record', async (ctx, next) => {
  const articleList = await RecordModel.find({});  
  ctx.body = {
    msg: 'article list',
    data: articleList,
  };
});

// GET: record detail
recordRouter.get('/record/:id', async (ctx, next) => {
  const reqParams = ctx.params;
  const article = await RecordModel.find({ _id: reqParams.id });
  ctx.body = {
    msg: 'article detail',
    data: article,
  };
});

// POST: new article 
// {
//   "title":"test",
//   "content":"test",
//   "create_time":123456
// }
recordRouter.post('/record', async (ctx, next) => {
  const reqBody = ctx.request.body;
  const article = new RecordModel(reqBody);
  const res = await article.save((err) => {
    console.log('save satatus:', err);
  });
  ctx.body = {
    msg: 'new article',
    data: res,
  };
  console.log(1);
});

// DELETE: delete article
recordRouter.delete('/record', async (ctx, next) => {
  const { ids } = ctx.request.body;
  const res = await RecordModel.remove({ _id: { $in: ids } });
  ctx.body = {
    msg: 'delete article',
    data: res,
  };
});


// PUT: change article
recordRouter.put('/record/:id', async (ctx, next) => {
  const reqBody = ctx.request.body;   
  const { id } = ctx.params;  
  console.log('--', id, reqBody);
  const res = await RecordModel.update({ _id: id }, reqBody);
  ctx.body = {
    msg: 'change article',
    data: res,
  };
});


module.exports = recordRouter;

