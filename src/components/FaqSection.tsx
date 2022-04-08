import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  makeStyles,
  TextField,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import APITable from "./APITable";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
}));

const questionsAndAnswers = [
  {
    question: "What is UnstoppableSwap?",
    answer:
      "UnstoppableSwap is a service that enables the trustless exchange of Bitcoin to Monero by utilizing Atomic Swaps. Our goal is to provide an alternative to centralized exchanges that are known to abuse their power by blocking withdrawals, charging exorbitant fees, or requiring disclosure of personal information. Although we intend to become a market maker at some point in the future, our main focus is to ease the use of Atomic Swaps and offer a platform for comparing swap providers.",
  },
  {
    question: "How can I trust you?",
    answer:
      "Since we use Atomic Swaps, you don't have to trust us at all. The entire swap process is completely trustless and is made possible by the COMIT XMR-BTC Atomic Swap protocol. We cannot steal your funds even if we wanted to. Unlike traditional swapping services like ChangeNow or Changelly, we cannot hold your funds captive and require you to supply us with personal information you don't want to give up.",
  },
  {
    question: "At what rate can I buy XMR?",
    answer:
      "The current rate is always displayed when you start a swap. The exchange rate is completely transparent and can't be suddenly altered after the swap has started because the amounts are enforced by the protocol itself.",
  },
  {
    question: "Do I need to provide identification?",
    answer:
      "Inspired by the original idea of cryptocurrency, we believe that privacy is a human right. No registration or provision of personal data on UnstoppableSwap. We will never ask you for any personal data.",
  },
  {
    question: "How do Atomic Swaps work?",
    answer: (
      <>
        BTC-XMR Atomic Swaps were made possible by the rigorous research of some
        ingenious cryptographers. Specifically the research made by the COMIT
        Team and the Farcaster Project. If you want to know learn more about
        BTC-XMR Atomic Swaps, please read the blog posts by the{" "}
        <a href="https://comit.network/blog/" target="_blank" rel="noreferrer">
          COMIT team
        </a>{" "}
        and the{" "}
        <a
          href="https://www.monerooutreach.org/stories/monero-atomic-swaps.html"
          target="_blank"
          rel="noreferrer"
        >
          MoneroOutreach Workgroup
        </a>
        .
      </>
    ),
  },
  {
    question: "Can I exchange my XMR for BTC?",
    answer:
      "Due to technical limitations and the way the protocol works it is currently not possible to exchange XMR for BTC. This functionality will likely be enabled by the next hard fork.",
  },
  {
    question: "How can I support the development of Atomic Swaps?",
    answer: (
      <>
        The best way to contribute to the emergence of protocols that enable the
        trustless exchange of Monero with other assets is to contribute with
        code or by building infrastructure like this page around those
        protocols. Please visit the COMIT team's Github repository if you are a
        developer and want to help. You can also choose to help us fund our
        operations by directly donating to:
        <br />
        <TextField
          fullWidth
          value="87jS4C7ngk9EHdqFFuxGFgg8AyH63dRUoULshWDybFJaP75UA89qsutG5B1L1QTc4w228nsqsv8EjhL7bz8fB3611Mh98mg"
        />
      </>
    ),
  },
  {
    question: "What are Atomic Swaps?",
    answer:
      "Atomic Swaps enable the exchange of one cryptocurrency for another without using a centralized intermediary. They allow two users to swap two assets from two different chains without having to trust each other. They have been very difficult to implement with Monero in the past due to the lack of scripting support.",
  },
  {
    question: "What is a Swap Provider?",
    answer:
      "A Swap Provider is someone you can connect with to exchange your BTC for XMR. Since the exchange is trustless, they can't steal money from you. However, a malicious swap provider may rob you of your time and network fees.",
  },
  {
    question: "Do you provide a public REST API?",
    answer: (
      <>
        Yes, we provide an easy to use API for anyone to retrieve information
        about swap providers. Requests are made using standard HTTP or the
        socket.io protocol and responses are returned in JSON format.
        <br />
        <APITable />
      </>
    ),
  },
];

export default function FaqSection() {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      {questionsAndAnswers.map((data) => (
        <Accordion key={data.question} TransitionProps={{ mountOnEnter: true }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle2">{data.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{data.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}
