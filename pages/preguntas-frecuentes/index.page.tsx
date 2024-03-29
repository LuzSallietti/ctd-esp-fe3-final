import React from 'react'
import { FaqsType } from 'dh-marvel/components/faqs/faqsData'
import { GetStaticProps, NextPage } from "next";
import Head from 'next/head';
import LayoutGeneral from 'dh-marvel/components/layouts/layout-general';
import { Box } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Typography, Container } from '@mui/material';


interface FaqsPageProps {
  faqs: FaqsType[];
}

const Faqs: NextPage<FaqsPageProps> = ({ faqs }) => {
  return (
    <>
      <Head>
        <title>Marvel Comics E-commerce - Preguntas Frecuentes</title>
        <meta name="description" content="Preguntas Frecuentes: todas las respuestas a las dudas frecuentes." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LayoutGeneral>
        <Box component={'section'} sx={{ display: 'flex', flexDirection: 'column', p:{ xs:'1rem', sm:'3rem 0'} }}>
          <Typography variant={"h2"} my={2} textAlign={'center'} fontSize={28} fontWeight={600}> Preguntas Frecuentes</Typography>
          <Container sx={{ marginTop: '3rem', justifyContent:'center' }}>
            {faqs.map((faq) => (
              <Accordion key={faq.id} sx={{ margin: '.5rem 0', width:{ sx:'100%'} }}>
                <AccordionSummary id="panel-header" aria-controls="panel-content" sx={{ fontWeight: '600' }} expandIcon={<ArrowDropDownIcon />}>
                  {faq.question}
                </AccordionSummary>
                <AccordionDetails>
                  {faq.answer}
                </AccordionDetails>
              </Accordion>
            ))}
          </Container>
        </Box>
      </LayoutGeneral>
    </>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const url = process.env.VERCEL_PROD_URL
  const response = await fetch(`${url}/api/faqs`);
  const faqs = await response.json();

  return {
    props: {
      faqs,
    },
  };
};

export default Faqs