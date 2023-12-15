import 'zone.js/node';
import '@angular/platform-server/init';

import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { renderApplication } from '@angular/platform-server';
import type { Connect } from 'vite';
import type { ServerResponse } from 'http';

import { config } from './app/app.config.server';
import { AppComponent } from './app/app.component';

if (import.meta.env.PROD) {
  enableProdMode();
}

export function bootstrap() {
  return bootstrapApplication(AppComponent, config);
}

export default async function render(
  url: string,
  document: string,
  { req, res }: { req: Connect.IncomingMessage, res: ServerResponse }) {
  const html = await renderApplication(bootstrap, {
    document,
    url,
    platformProviders: [
      {
        provide: 'req',
        useValue: req,
      },
      {
        provide: 'res',
        useValue: res,
      },
    ],
  });

  return html;
}
