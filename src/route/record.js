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
    msg: 'record list',
    data: articleList,
  };
});

// GET: record detail
recordRouter.get('/record/:id', async (ctx, next) => {
  const reqParams = ctx.params;
  const article = await RecordModel.find({ _id: reqParams.id });
  ctx.body = {
    msg: 'record detail',
    data: article,
  };
});

// POST: new record 
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
    msg: 'new record',
    data: res,
  };
  console.log(1);
});

// DELETE: delete article
recordRouter.delete('/record', async (ctx, next) => {
  const { ids } = ctx.request.body;
  const res = await RecordModel.remove({ _id: { $in: ids } });
  ctx.body = {
    msg: 'delete record',
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
    msg: 'change record',
    data: res,
  };
});


module.exports = recordRouter;

