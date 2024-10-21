import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import js from "react-syntax-highlighter/dist/esm/languages/hljs/javascript";
import a11yDark from "react-syntax-highlighter/dist/esm/styles/hljs/a11y-dark";

SyntaxHighlighter.registerLanguage("javascript", js);

const exampleApiResponse = `[
  {
    "multiAddr": "/dns4/xmr-btc-asb.coblox.tech/tcp/9939",
    "peerId": "12D3KooWCdMKjesXMJz1SiZ7HgotrxuqhQJbP5sgBm2BwP1cqThi",
    "testnet": true,
    "price": 414201,
    "minSwapAmount": 10000,
    "maxSwapAmount": 100000,
    "age": 11059330,
    "uptime": 0.9962544391221945,
    "relevancy": 0.6466112825788751
  },
]
`;

const httpCodeExample = `fetch('https://api.unstoppableswap.net/api/list').then(r => r.json()).then(providerList => {
    console.log(\`\${providerList.length} swap providers are currently online!\`)
    
    providerList.forEach(provider => {
        console.log(\`\${provider.multiAddr} has been online for \${provider.age} seconds!\`)
    })
})`;

const socketCodeExample = `const { io } = require('socket.io-client')

socket = io('https://api.unstoppableswap.net', {
    path: "/api/socket.io",
});

socket.on("provider-refresh", providerList => {
    console.log(\`\${providerList.length} swap providers are currently online!\`)
    
    providerList.forEach(provider => {
        console.log(\`\${provider.multiAddr} has been online for \${provider.age} seconds!\`)
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
