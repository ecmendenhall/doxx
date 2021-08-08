declare module "draft-js-prism-plugin" {
  import { EditorPlugin } from "@draft-js-plugins/editor";
  const createPrismPlugin: (config?: any) => EditorPlugin;
  export default createPrismPlugin;
}
