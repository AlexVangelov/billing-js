System.config({
  //use typescript for compilation
  transpiler: 'typescript',
  //typescript compiler options
  typescriptOptions: {
    emitDecoratorMetadata: true
  },
  paths: {
    'npm:': 'https://unpkg.com/'
  },
  //map tells the System loader where to look for things
  map: {
    
    'app': './src',
    
    '@angular/core': 'npm:@angular/core@2.0.2/bundles/core.umd.js',
    '@angular/common': 'npm:@angular/common@2.0.2/bundles/common.umd.js',
    '@angular/compiler': 'npm:@angular/compiler@2.0.2/bundles/compiler.umd.js',
    '@angular/platform-browser': 'npm:@angular/platform-browser@2.0.2/bundles/platform-browser.umd.js',
    '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic@2.0.2/bundles/platform-browser-dynamic.umd.js',
    '@angular/http': 'npm:@angular/http@2.0.2/bundles/http.umd.js',
    '@angular/router': 'npm:@angular/router@2.0.2/bundles/router.umd.js',
    '@angular/forms': 'npm:@angular/forms@2.0.2/bundles/forms.umd.js',
    
    '@angular/core/testing': 'npm:@angular/core@2.0.2/bundles/core-testing.umd.js',
    '@angular/common/testing': 'npm:@angular/common@2.0.2/bundles/common-testing.umd.js',
    '@angular/compiler/testing': 'npm:@angular/compiler@2.0.2/bundles/compiler-testing.umd.js',
    '@angular/platform-browser/testing': 'npm:@angular/platform-browser@2.0.2/bundles/platform-browser-testing.umd.js',
    '@angular/platform-browser-dynamic/testing': 'npm:@angular/platform-browser-dynamic@2.0.2/bundles/platform-browser-dynamic-testing.umd.js',
    '@angular/http/testing': 'npm:@angular/http@2.0.2/bundles/http-testing.umd.js',
    '@angular/router/testing': 'npm:@angular/router@2.0.2/bundles/router-testing.umd.js',
    
    'rxjs': 'npm:rxjs',
    'typescript': 'npm:typescript@2.0.2/lib/typescript.js'
  },
  //packages defines our app package
  packages: {
    app: {
      main: './main.ts',
      defaultExtension: 'ts'
    },
    rxjs: {
      defaultExtension: 'js'
    }
  }
});