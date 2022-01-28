import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import phImg from '../../images/ph.png';
import transitionSound from '../../sounds/transition.m4a';
import { Quotes } from '../../components';
import { getQuote } from '../../services';

const audio = new Audio(transitionSound);

export function App() {
  const isMounted = useRef(true);
  const [quote, setQuote] = useState({
    speaker: 'Carregando Áudio...',
    quote: 'Carregando Mensagem...'
  });

  const onUpdate = async () => {
    const resQuote = await getQuote();

    if (isMounted.current) {
      setQuote(resQuote);
      audio.play();
    }
  };

  useEffect(() => {
    onUpdate();

    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <Content>
      <Quotes {...quote} onUpdate={onUpdate} />
      <PhImg alt="Minha foto de perfil" src={phImg} />
    </Content>
  );
}

const Content = styled.div`
  height: 100vh;
  box-sizing: border-box;
  padding: 0 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const PhImg = styled.img`
  max-width: 50vw;
  align-self: flex-end;
`;
