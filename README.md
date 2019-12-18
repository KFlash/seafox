# Seafox

> Worlds fastest javascript parser written in JS / TS

## WORK IN PROGRESS!!  Will probably never be finished. I'm just playing around with performance :)


## Usage

```ts
import { parseScript, parseModule } from 'seafox';

// parse module code
parseModule(code, options);

// parse script
parseScript(code, options);
```

## Options  

- Loc - Enable location tracking
- DisableWebCompat - Disable AnnexB
- Directives - Directive AST nodes 
