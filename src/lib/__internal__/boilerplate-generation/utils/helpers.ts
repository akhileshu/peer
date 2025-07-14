/* eslint-disable @typescript-eslint/no-explicit-any */
import path from "path";
import { NodePlopAPI } from "plop";

export function registerHelpers(plop: NodePlopAPI) {
  const safe = <T>(fn: () => T, fallback: T) => {
    try {
      return fn();
    } catch (e) {
      console.log(e);
      debugger;
      return fallback;
    }
  };
  /**in Handlebars helpers, when using rest parameters (...parts), the last argument is always the Handlebars options object — not an actual string input. So:
   */
  // function stripOptions(args: any[]) {
  //   const last = args[args.length - 1];
  //   return typeof last === "object" && last !== null && "fn" in last
  //     ? args.slice(0, -1)
  //     : args;
  // }
  function stringParts(args: any[]) {
    return args.filter(
      (part) => typeof part === "string" && part.trim() !== ""
    );
  }

  plop.setHelper("firstType", (types: string[] | undefined) =>
    safe(() => types?.[0] ?? "any", "__MISSING_firstType")
  );

  plop.setHelper("eq", function (a, b) {
    return a === b;
  });

  plop.setHelper("firstZodSchema", (schemas: string[] | undefined) =>
    safe(() => schemas?.[0] ?? "anySchema", "__MISSING_firstZodSchema")
  );

  plop.setHelper("firstServerAction", (actions: string[] | undefined) =>
    safe(() => actions?.[0] ?? "defaultAction", "__MISSING_firstServerAction")
  );

  plop.setHelper("firstApiRoute", (routes: string[] | undefined) =>
    safe(
      () => (routes?.[0] ? `'/api/${routes[0]}'` : "'api/default'"),
      "'__MISSING_apiRoute'"
    )
  );

  plop.setHelper("storeImport", (store: string | undefined) =>
    safe(() => store ?? "useDefaultStore", "__MISSING_store")
  );

  plop.setHelper("hookImports", (hooks: string[] | undefined) =>
    safe(() => hooks?.map((h) => `use${h}`).join(", ") ?? "", "")
  );

  plop.setHelper("properCase", (str: string) =>
    safe(
      () =>
        str.replace(
          /\w\S*/g,
          (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        ),
      "__ERROR_properCase"
    )
  );

  plop.setHelper("camelCase", (str: string) =>
    safe(
      () => str.replace(/-([a-z])/g, (g) => g[1].toUpperCase()),
      "__ERROR_camelCase"
    )
  );
  plop.setHelper("camelCaseJoin", (...parts: any[]) =>
    safe(() => {
      // Remove Handlebars options object if present
      return stringParts(parts)
        .filter(Boolean)
        .map((part: string, index: number) => {
          const clean = part
            .toString()
            .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ""))
            .replace(/^[A-Z]/, (c) => c.toLowerCase());
          if (index === 0) return clean;
          return clean.charAt(0).toUpperCase() + clean.slice(1);
        })
        .join("");
    }, "__ERROR_camelCaseJoin")
  );

  plop.setHelper("kebabCase", (str: string) =>
    safe(
      () =>
        str
          .replace(/([a-z])([A-Z])/g, "$1-$2") // convert camelCase to kebab-case
          .replace(/\s+/g, "-") // replace spaces with dashes
          .replace(/_/g, "-") // replace underscores with dashes
          .toLowerCase(),
      "__ERROR_kebabCase"
    )
  );

  plop.setHelper("kebabCaseJoin", (...parts: any[]) =>
    safe(
      () =>
        stringParts(parts)
          .filter(Boolean)
          .join("-") // Join with hyphens
          .replace(/([a-z])([A-Z])/g, "$1-$2") // Convert camelCase to kebab-case
          .toLowerCase(), // Convert to lowercase
      "__ERROR_kebabCaseJoin"
    )
  );

  plop.setHelper("dashCase", (str: string) =>
    safe(
      () =>
        str
          .replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`)
          .replace(/^-/, ""),
      "__ERROR_dashCase"
    )
  );

  plop.setHelper("first", (array: any[] | undefined) =>
    safe(() => array?.[0] ?? null, "__MISSING_first")
  );

  plop.setHelper("joinWithComma", (array: any[] | undefined) =>
    safe(() => array?.join(", ") ?? "", "__MISSING_joinWithComma")
  );

  plop.setHelper("withExtension", (filename: string, ext: string) =>
    safe(
      () => filename.replace(new RegExp(`${ext}$`), "") + ext,
      "__ERROR_withExtension"
    )
  );

  plop.setHelper("relativePath", (from: string, to: string) =>
    safe(
      () => path.relative(from, to).replace(/\\/g, "/"),
      "__ERROR_relativePath"
    )
  );
}

export const stringHelpers = {
  toKebabCase(str: string): string {
    return str
      .replace(/([a-z])([A-Z])/g, "$1-$2")
      .replace(/\s+/g, "-")
      .toLowerCase();
  },

  toPascalCase(str: string): string {
    return str
      .replace(/[_-]+/g, " ")
      .replace(/\s+(.)/g, (_, group1) => group1.toUpperCase())
      .replace(/^(.)/, (_, group1) => group1.toUpperCase())
      .replace(/\s+/g, "");
  },

  toCamelCase(str: string): string {
    const pascal = stringHelpers.toPascalCase(str);
    return pascal.charAt(0).toLowerCase() + pascal.slice(1);
  },

  kebabCaseJoin(...parts: string[]): string {
    return parts
      .filter(Boolean)
      .join("-")
      .replace(/([a-z])([A-Z])/g, "$1-$2")
      .toLowerCase();
  },

  snakeCaseJoin(...parts: string[]): string {
    return parts
      .filter(Boolean)
      .join("_")
      .replace(/([a-z])([A-Z])/g, "$1_$2")
      .toLowerCase();
  },
};
