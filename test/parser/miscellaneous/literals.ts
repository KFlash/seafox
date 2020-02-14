import { fail } from '../core';
import { Context } from '../../../src/parser/common';

fail('Miscellaneous - Literals (fail)', [
  [`"use strict"; 'use strict'; ('\\1')`, Context.Empty],
  [`"use strict"; 'use strict'; ('\\4')`, Context.Empty],
  [`"use strict"; 'use strict'; ('\\11')`, Context.Empty],
  [`"use strict"; 'use strict'; ('\\000')`, Context.Empty],
  [`"use strict"; 'use strict'; ('\\00')`, Context.Empty],
  [`"use strict"; ('\\00n') 'use strict';`, Context.Empty],
  [`"use strict"; ('\\00') 'use strict';`, Context.Empty],
  [`"use strict"; ('\\000') 'use strict';`, Context.Empty],
  [`"use strict"; ('\\4') 'use strict';`, Context.Empty],
  [`"use strict"; ('\\1') 'use strict';`, Context.Empty],
  [`('\\00n') 'use strict';`, Context.Empty],
  [`('\\00') 'use strict';`, Context.Empty],
  [`('\\4') 'use strict';`, Context.Empty],
  [`('\\1') 'use strict';`, Context.Empty],
  [`('\\123') 'use strict';`, Context.Empty],
  [`('\\x')`, Context.Empty],
  [`('\\x')`, Context.Strict],
  [`(")`, Context.Empty],
  [`('\\9')`, Context.Empty],
  [`('\\9')`, Context.Strict | Context.Module],
  [`\\0009`, Context.Empty],
  [`("\\u{FFFFFFF}")`, Context.Empty],
  [`'use strict'; ('\\1')`, Context.Empty],
  [`'use strict'; ('\\4')`, Context.Empty],
  [`'use strict'; ('\\11')`, Context.Empty],
  [`'use strict'; ('\\00')`, Context.Empty]
]);
