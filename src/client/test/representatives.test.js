import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import casual from 'casual';
import _ from 'underscore';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

import { RepresentativeList } from '../components/representatives/index.js';

describe('RepresentativeList', function() {
  const muiTheme = getMuiTheme();

  const mountWithContext = (node) => mount(
    node, {
      context: {muiTheme},
      childContextTypes: {muiTheme: React.PropTypes.object}
    }
  );

  const representative = {
    id: '9101112',
    first_name: casual.first_name,
    last_name: casual.last_name,
    chamber: 'house',
    state: casual.state_abbr,
  }

  const representatives = [
    {
      id: '1234',
      first_name: casual.first_name,
      last_name: casual.last_name,
      chamber: 'house',
      state: casual.state_abbr,
    }
  ]

  const component = <RepresentativeList
        data={{
          membersLocal: [
            {
              id: '1234',
              first_name: casual.first_name,
              last_name: casual.last_name,
              chamber: 'house',
              state: casual.state_abbr,
            },
            {
              id: '5678',
              first_name: casual.first_name,
              last_name: casual.last_name,
              chamber: 'house',
              state: casual.state_abbr,
            }
          ]
        }}
        userRepresentatives={ representatives }
        addRepresentative={ (rep) => { representatives.push(rep) }}
      />;

  it('has a list with an item count of 2', function() {
    expect(shallow(component).find('.representative-list-item')).to.have.length(2);
  }),
  it('only rep that is in userReps is toggled', function() {
    const wrapper = mountWithContext(component);
    expect(wrapper.find('.representative-list-item').first().find('input').props().defaultChecked).to.equal(true);
    expect(wrapper.find('.representative-list-item').last().find('input').props().defaultChecked).to.equal(false);
  }),
  it('should toggle and call addRepresentative', function() {
    const wrapper = mountWithContext(component);
    expect(representatives).to.have.length(1);
    wrapper.instance().toggleRepresentative(representative);
    expect(representatives).to.have.length(2);
  })
})
