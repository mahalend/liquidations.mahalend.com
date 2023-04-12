import mixpanel from "mixpanel-browser";

export const isProduction = process.env.REACT_APP_ISPROD === "true";

if (isProduction) {
  mixpanel.init("03bbfe0aa232fddaa505db6eb2699b62");
} else {
  mixpanel.init("2ba45bafde7e4aef8ec8bdec33957143");
}

let env_check = true;

let actions = {
  identify: (id) => {
    if (env_check) {
      mixpanel.identify(id);
    }
  },
  alias: (id) => {
    if (env_check) mixpanel.alias(id);
  },
  track: (name, props) => {
    if (env_check) {
      mixpanel.track(name, props);
    }
  },
  people: {
    set: (props) => {
      if (env_check) mixpanel.people.set(props);
    },
  },
};

export let Mixpanel = actions;
