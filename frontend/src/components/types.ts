export interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * This will be used if your component is rendered in an iframe.
   * You typically don't need this unless your app is embedded within an iframe.
   */
  window?: () => Window;

  /**
   * Custom content or components to render inside the Box.
   * This is useful if you want to pass additional elements to be displayed inside the Welcome component.
   */
  children?: React.ReactNode;
}
