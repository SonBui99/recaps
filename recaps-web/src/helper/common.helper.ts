
export function invariant(condition: boolean, format: string, ...args: any[]) {
  let warning: any = function emptyFunction() {};
  if (process.env.NODE_ENV === 'development') {
    warning = function warningFunction() {
      if (format === undefined) {
        throw new Error(`'warning(condition, format, ...args)' requires a warning message argument`);
      }

      if (format.length < 10 || /^[s\W]*$/.test(format)) {
        throw new Error(
          `The warning format should be able to uniquely identify this warning. Please, use a more descriptive format than: ${format}`,
        );
      }

      if (format.indexOf('Failed Composite propType: ') === 0) {
        return; // Ignore CompositeComponent proptype check.
      }

      if (!condition) {
        const argIndex: number = 0;
        const message: string = `Warning: ${format.replace(/%s/g, () => args[argIndex + 1])}`;
        // eslint-disable-next-line no-console
        console.warn(message);
      }
    };
  }
  return warning();
}


export function pxToRem(px: number) {
  return `${px / 16}rem`;
}

