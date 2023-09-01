import Head from 'next/head'
import { useState } from "react";
import { Web3 } from "web3";
import { Layout, Button, theme, Avatar, Col, Row } from 'antd';



export default function Home() {
  const web = new Web3();
  const [account, setAccount] = useState("");
  const [tx, setTx] = useState("");
  const { Header, Footer, Content } = Layout;
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const ConnectMetaMask = async () => {
    try {
        window.ethereum.enable().then(async () => {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        setAccount(accounts[0]);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const mint = async () => {
    try {
      const minting = await web.eth.abi.encodeFunctionCall({
        name: 'safeMint',
        type: 'function',
        inputs: [{
            internalType: "address",
            type: 'address',
            name: 'to'
        }]
      }, [account]);
      try {
        await window.ethereum.request({
          method: 'eth_sendTransaction',
          params: [
            {
              from: account, 
              to: "0x90826918A1337Ee51776503Dbd9965411B67e5B9",
              data: minting,
            },
          ],
        }).then((txHash:any) => setTx(txHash));
      } catch (e) {
        console.log(e);
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <Head>
        <title>CloneMyMate</title>
        <meta name="description" content="CloneMyMate" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={{height:"100vh"}}>
        {!account ? (
          <div  style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "100vh",
              }}>
          <Button type="primary" onClick={ConnectMetaMask}>Connect to MetaMask</Button>
          </div>
        ) : null}
        {account ? (
              <Layout style={{ height: "100vh" }}>
                <Header style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ textAlign: 'center', color: '#ffffff', fontSize: '25px' }}>CloneMyMate</div>
                </Header>
                <Content style={{ padding: '24px 50px' }}>
                <Layout style={{ padding: '24px 0', background: colorBgContainer }}>
                  <Content style={{ padding: '0 24px', minHeight: 280, color: '#000000' }}>
                    <Row>
                      <Col span={24} style={{ fontSize: '18px' }}>MyAddress: <a href={"https://evm.ngd.network/address/"+account} target='_blank'>{account}</a></Col>
                    </Row>
                    <Row>
                      <Col span={24} style={{ fontSize: '18px' }}>Transaction: <a href={"https://evm.ngd.network/tx/"+tx} target='_blank'>{tx}</a></Col>
                    </Row>
                    <Row>
                      <Col span={24}><Avatar style={{ margin: "20px auto" }} shape="square" size={250} src="https://neo-hackathon-pearl.vercel.app/mate.png" /></Col>
                    </Row>
                    <Row>
                      <Col span={24}><Button type="primary" style={{width: "100px", height: "50px", margin:"0 auto", fontSize: "20px", fontWeight: "bold"}} onClick={mint}>Mint</Button></Col>
                    </Row>
                  </Content>
                </Layout>
                </Content>
                <Footer style={{ textAlign: 'center' }}>CloneMyMate ©2023 Developed by smlee</Footer>
              </Layout>
        ) : null}
      </main>
    </>
  )
}
