import { library } from "@fortawesome/fontawesome-svg-core";
import { faTachometerAlt, faUsers } from "@fortawesome/free-solid-svg-icons";
// import { fab } from "@fortawesome/free-brands-svg-icons";
// import { faCheckSquare, faCoffee } from "@fortawesome/free-solid-svg-icons";

// library.add(fab, faCheckSquare, faCoffee);
export default () => {
  library.add(faTachometerAlt, faUsers);
};
