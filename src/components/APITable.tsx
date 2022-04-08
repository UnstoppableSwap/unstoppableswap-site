import {
  Box,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import js from "react-syntax-highlighter/dist/esm/languages/hljs/javascript";
import a11yDark from "react-syntax-highlighter/dist/esm/styles/hljs/a11y-dark";

SyntaxHighlighter.registerLanguage("javascript", js);

const exampleApiResponse = `[
  {
    "multiAddr": "/dnsaddr/unstoppableswap.net",
    "peerId": "12D3KooWLHbHtkK53WoBA82Yht3PCCx6KXYxoJ6QqgXg1rSNtWhR",
    "testnet": true,
    "price": 402800,
    "minSwapAmount": 10000,
    "maxSwapAmount": 10000000,
    "uptimeSeconds": 3467365,
    "downtimeSeconds": 32246629,
    "age": 122,
    "relevancy": 1.2222222222222223
  },
]
`;

const httpCodeExample = `fetch('https://api.unstoppableswap.net/api/list').then(r => r.json()).then(providerList => {
    console.log(\`\${providerList.length} swap providers are currently online!\`)
    
    providerList.forEach(provider => {
        console.log(\`\${provider.multiAddr} has been online for \${provider.age} days!\`)
    })
})`;

const socketCodeExample = `const { io } = require('socket.io-client')

socket = io('https://api.unstoppableswap.net', {
    path: "/api/socket.io",
});

socket.on("provider-refresh", providerList => {
    console.log(\`\${providerList.length} swap providers are currently online!\`)
    
    providerList.forEach(provider => {
        console.log(\`\${provider.multiAddr} has been online for \${provider.age} days!\`)
    })
});
`;

const useStyles = makeStyles((theme) => ({
  tableOuter: {
    display: "flex",
    justifyContent: "center",
  },
  table: {
    maxWidth: "min(1000px, 85vw)",
    marginTop: theme.spacing(1),
  },
}));

function APITable() {
  const classes = useStyles();

  return (
    <Box className={classes.tableOuter}>
      <TableContainer
        className={classes.table}
        component={Paper}
        variant={"outlined"}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>HTTP</TableCell>
              <TableCell>Web Socket</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align={"left"}>Protocol</TableCell>
              <TableCell>HTTP 2.0/3.1</TableCell>
              <TableCell>Socket.io</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align={"left"}>Endpoint</TableCell>
              <TableCell>https://api.unstoppableswap.net/api/list</TableCell>
              <TableCell>
                https://api.unstoppableswap.net/api/socket.io
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align={"left"}>Example Response</TableCell>
              <TableCell>
                <SyntaxHighlighter language="json" style={a11yDark}>
                  {exampleApiResponse}
                </SyntaxHighlighter>
              </TableCell>
              <TableCell>
                Event Name: provider-refresh
                <br />
                <SyntaxHighlighter language="json" style={a11yDark}>
                  {exampleApiResponse}
                </SyntaxHighlighter>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align={"left"}>Code Example (JS)</TableCell>
              <TableCell>
                <SyntaxHighlighter language="javascript" style={a11yDark}>
                  {httpCodeExample}
                </SyntaxHighlighter>
              </TableCell>
              <TableCell>
                <SyntaxHighlighter language="javascript" style={a11yDark}>
                  {socketCodeExample}
                </SyntaxHighlighter>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default APITable;
