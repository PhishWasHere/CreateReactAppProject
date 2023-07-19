import React from 'react';
import {Link} from 'react-router-dom';

import Projects from '../../components/projects';
import Form from '../../components/form';

export default function Home () {
  return (
    <main>
      <Projects />
      <Form />
    </main>
  );
}
