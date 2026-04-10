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

/**
 * Interface for the props used in a drawer component.
 *
 * This interface defines the expected structure of the props passed to the drawer component,
 * which includes a function to toggle the drawer's open/closed state.
 */
export interface DrawerProps {
  /**
   * A function that toggles the drawer's open/closed state.
   *
   * This function is typically called when the user interacts with the drawer's control
   * (e.g., clicking on a close or open button).
   */
  handleDrawerToggle: () => void;
}
