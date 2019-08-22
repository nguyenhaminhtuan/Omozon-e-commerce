import React from 'react';
import styled from 'styled-components';

export default function FutureSection(props) {
  const Section = styled.section`
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
    font-size: 60px;
  `;

  return (
    <Section className='future shadow m-2 p-2'>
      <FutureIcon className='future-icon'>{props.icon}</FutureIcon>
      <TextBody>
        <p className='text-white pb-4 pt-2'>{props.text}</p>
      </TextBody>
    </Section>
  );
}
