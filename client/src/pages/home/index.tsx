import React from 'react';
import {Link} from 'react-router-dom';

import Projects from '../../components/projects';
import AddProject from '../../components/addproject';

export default function Home () {
  return (
    <main>
      <Projects />
      <AddProject />
    </main>
  );
}
