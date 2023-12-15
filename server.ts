import { eventHandler } from 'h3';
import renderer from "./src/main.server";

// This file is consumed at build time by the server renderer
// @ts-ignore
import template from './dist/client/index.html?raw';

export default eventHandler(async (event) => {
  const html = await renderer(event.node.req.url as string, template, {
    req: event.node.req,
    res: event.node.res,
  });

  return html;
});
