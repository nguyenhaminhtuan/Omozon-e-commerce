import React from 'react';
import styled from 'styled-components';

export default function FutureSection(props) {
  const Section = styled.section`
    max-width: 33%;
    text-align: center;
    color: #fff;
    border-radius: 5px;
    background: linear-gradient(165deg, #db7093, #40e0d0);
  `;
  const TextBody = styled.div`
    padding: 0 10%;
    color: #000;
  `;
  const FutureIcon = styled.div`
    font-size: 50px;
  `;

  return (
    <Section className='future shadow-lg ml-2 mr-2'>
      <FutureIcon className='future-icon'>{props.icon}</FutureIcon>
      <TextBody>
        <p className='text-white pb-4'>{props.text}</p>
      </TextBody>
    </Section>
  );
}
