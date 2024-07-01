import { TestComponent } from './app/test/test.component';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

// import { bootstrapApplication } from '@angular/platform-browser';
//     import { TestComponent } from './app/test/test.component';

//     bootstrapApplication(TestComponent).catch((err) => console.error(err));