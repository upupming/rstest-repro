import "node:module";
const RSTEST_DYNAMIC_IMPORT_HOOK = '__rstest_dynamic_import__';
const RSTEST_REQUIRE_RESOLVE_HOOK = '__rstest_require_resolve__';
const importMetaHook = (name)=>`import.meta.${name}`;
export { RSTEST_DYNAMIC_IMPORT_HOOK, RSTEST_REQUIRE_RESOLVE_HOOK, importMetaHook };
