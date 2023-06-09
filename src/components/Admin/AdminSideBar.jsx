import React, { useState, useEffect, useRef, useMemo } from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
// import Web3 from "web3";
import Web3 from "web3";
// import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import CloseIcon from "@material-ui/icons/Close";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TelegramIcon from "@mui/icons-material/Telegram";
import { Sling as Hamburger } from "hamburger-react";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import TwitterIcon from "@mui/icons-material/Twitter";
import HomeIcon from "@mui/icons-material/Home";
import StorageIcon from "@mui/icons-material/Storage";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import jazzicon from "@metamask/jazzicon";
import StarsIcon from "@mui/icons-material/Stars";
import ApprovalIcon from "@mui/icons-material/Approval";
import CreditScoreTwoToneIcon from "@mui/icons-material/CreditScoreTwoTone";
// import { AccountNavigation } from "./DashboardPages/AccountNavigation";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { Authenticate } from "../auth/Authenticate";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link } from "react-router-dom";
import DescriptionIcon from "@mui/icons-material/Description";
import SwapHorizontalCircleIcon from "@mui/icons-material/SwapHorizontalCircle";
import OpacityIcon from "@mui/icons-material/Opacity";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import BarChartIcon from "@mui/icons-material/BarChart";
import "../../css/dashboardheader.css";
import "../../css/dashBoardSideBar.css";
import { numberWithCommas } from "../../static";
import SwitchToggle2 from "../Dashboard/DashBoardPages/SwitchToggle/SwitchToggle2";
import {
  checkAllowance,
  unluckToken,
  transactReceipt,
  getPrice,
  getPriceImpl,
  getTickerInfo,
  tokenBalance,
  open,
  getLatestLoan,
  repay,
  topup,
  draw,
} from "../../web3/index";
import { parseEther, formatEther } from "@ethersproject/units";
import {
  Web3ReactProvider,
  useWeb3React,
  UnsupportedChainIdError,
} from "@web3-react/core";
const AdminSideBar = ({ check, togglemakeDark }) => {
  const dddd = localStorage.getItem("smallSidetoken");
  const [connectId, setConnectId] = useState(false);
  const [activeBg, setActiveBg] = useState("market");
  const [catDiv, setCatDiv] = useState("not_home");
  const [smallSide, setSmallSide] = useState(dddd);
  const [isOpen, setIsOpen] = useState(false);
  const [cartNum, setCartNum] = useState("");
  const [image, setImage] = useState("");
  const [asset, setAsset] = useState("");
  const [base, setBase] = useState("");
  const [searchBar, setSearchBar] = useState(false);
  const [acctNav, setAcctNav] = useState(false);
  const [activeMenuName, setActiveMenuName] = useState("Markets");
  const [showHeader, setshowHeader] = useState(true);
  const [betaDiv, setBetaDiv] = useState(true);
  const [conecttxt, setConnectTxt] = useState("Not Connected");
  const [nairaValue, setNairaValue] = useState(750);
  // const [darkMode, setDarkMode] = useState(null);
  const [walletAddr, setWalletAddr] = useState(
    "0xXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
  );
  const [connectNewAccountBtn, setConnectNewAccountBtn] = useState(false);
  const [disconnetDiv, setDisconnectDiv] = useState(false);
  const [egcUsdVal, setEgcUsdVal] = useState(0);
  const [egrUsdVal, setEgrUsdVal] = useState(0);
  const [coinBalance, setCoinBalance] = React.useState("0.00");
  const [coinBalance2, setCoinBalance2] = React.useState(0.0);
  const [baseBalance, setBaseBalance] = useState(0.0);

  const [productNamesZ, setProductNamesZ] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const linksActive = window.location.pathname;
  const urlArr = linksActive.split("/");
  const context = useWeb3React();
  const {
    connector,
    library,
    chainId,
    account,
    activate,
    deactivate,
    active,
    error,
  } = context;
  const avatarRef = useRef();
  const toggleAccountNav = () => {
    if (acctNav == true) {
      setAcctNav(false);
    } else if (acctNav == false) {
      setAcctNav(true);
    }
  };
  useEffect(() => {
    // setWalletAddr(account);
    // console.log(walletAddr.slice(0, 10));
    const element = avatarRef.current;
    if (element && account) {
      setWalletAddr(account);
      setConnectTxt("Connected");
      const addr = account.slice(2, 10);
      const seed = parseInt(addr, 16);
      console.log(addr, seed);
      const icon = jazzicon(20, seed); //generates a size 20 icon
      if (element.firstChild) {
        element.removeChild(element.firstChild);
      }
      element.appendChild(icon);
    }
  }, [account, avatarRef]);
  useEffect(() => {
    if (linksActive === "/dashboard") {
      setActiveMenuName("Earn");
    }
    if (linksActive === "/app/stake") {
      setActiveMenuName("Stake");
    }
    if (linksActive === "/app/user") {
      setActiveMenuName("Account Details");
    }
    if (linksActive === "/app/swap") {
      setActiveMenuName("Swap");
    }
    if (linksActive === "/app/earn/pool/detail") {
      setActiveMenuName("Earn");
    }
    if (linksActive === "/admin/setRouter") {
      setActiveMenuName("router");
    }
    if (linksActive === "/admin/priceOracle") {
      setActiveMenuName("priceOracle");
    }
    if (
      linksActive ===
      "/app/earn/pool/detail/branch/" + urlArr[6] + "/asset"
    ) {
      setActiveMenuName("Earn");
    }
    if (
      linksActive ===
      "/app/earn/pool/detail/" + urlArr[5] + "/transactions"
    ) {
      setActiveMenuName("Earn");
    }
    if (linksActive === "/app/earn/pool/" + urlArr[4] + "/detail") {
      setActiveMenuName("Earn");
    }
    if (linksActive === "/app/earn/pool/detail/transactions") {
      setActiveMenuName("Earn");
    }
    // if (linksActive === "/app/add") {
    //   setActiveMenuName("Liquidity");
    // }
    if (linksActive === "/app/whitepaper") {
      setActiveMenuName("Whitepaper");
    }
    if (linksActive === "/app/earn") {
      setActiveMenuName("Earn");
    }
    if (linksActive === "/app/stake/vault/" + urlArr[4] + "/ENGN") {
      setActiveMenuName("Vault");
    }
    if (linksActive === "/app/stake/deposit_vault/" + urlArr[4] + "/ENGN") {
      setActiveMenuName("Vault");
    }
  });
  useEffect(() => {
    if (linksActive == "/app/products") {
      setSearchBar(true);
    }
  });

  // //console.log(dddd);
  const changeBg = (e) => {
    let currentId = e.currentTarget.id;
    setActiveBg(currentId);
    if (linksActive === "/app/products") {
      setCatDiv("home");
    }
    if (linksActive === "/app/products/categories/id-phone") {
      setActiveBg("products");
      setCatDiv("home");
    }
  };

  useEffect(() => {
    if (linksActive === "/app/stake") {
      setActiveBg("market");
    }
    if (linksActive === "/admin") {
      setActiveBg("lend");
    }
    if (linksActive === "/admin/sellers") {
      setActiveBg("sellers");
    }
    if (linksActive === "/admin/modify/membership_plan") {
      setActiveBg("membership");
    }
    if (linksActive === "/admin/all/products") {
      setActiveBg("products");
    }
    if (linksActive === "/admin/setRouter") {
      setActiveBg("router");
    }
    if (linksActive === "/admin/priceOracle") {
      setActiveBg("priceOracle");
    }
    if (linksActive === "/admin/staff") {
      setActiveBg("transactions");
    }
    if (linksActive === "/admin/") {
      setActiveBg("lend");
    }
    if (linksActive === "/app/earn") {
      setActiveBg("lend");
    }
    if (linksActive === "/app/user") {
      setActiveBg("account");
    }
    if (linksActive === "/app/user/referral") {
      setActiveBg("account");
    }
    if (
      linksActive ===
      "/app/earn/pool/detail/branch/" + urlArr[6] + "/asset"
    ) {
      setActiveBg("lend");
    }
    if (
      linksActive ===
      "/app/earn/pool/detail/" + urlArr[5] + "/transactions"
    ) {
      setActiveBg("lend");
    }
    if (linksActive === "/app/earn/pool/" + urlArr[4] + "/detail") {
      setActiveBg("lend");
    }
    if (linksActive === "/app/earn/pool/detail/transactions") {
      setActiveBg("lend");
    }

    if (linksActive === "/app/swap") {
      setActiveBg("swap");
    }
    if (linksActive === "/app/add") {
      setActiveBg("pool");
    }

    if (linksActive === "/app/whitepaper") {
      setActiveBg("whitepaper");
    }

    if (smallSide == "not_small") {
      localStorage.setItem("smallSidetoken", "not_small");
    } else {
      localStorage.setItem("smallSidetoken", "smallSide");
    }
  }, []);

  const shrinkAction = () => {
    if (smallSide == "not_small") {
      setSmallSide("smallSide");
      localStorage.setItem("smallSidetoken", "smallSide");
    } else {
      setSmallSide("not_small");
      localStorage.setItem("smallSidetoken", "not_small");
    }
  };
  const web3 = new Web3(window.ethereum);
  useEffect(async () => {
    if (account) {
      const getBalance = await web3.eth.getBalance(account);
      // const getBalance2 = await web3.eth.getBalance(
      //   "0xe03f527a64128e8Edb64bf67256416302c56c4b7"
      // );
      const ethBalance = web3.utils.fromWei(getBalance, "ether");
      // const ethBalance2 = web3.utils.fromWei(getBalance2, "ether");
      console.log(ethBalance);
      // console.log(getBalance2);
      setCoinBalance(parseFloat(ethBalance).toFixed(3));
    }
  }, [coinBalance, account]);
  const toggleDisconnectDiv = () => {
    setDisconnectDiv(!disconnetDiv);
  };
  useEffect(() => {
    let assetVal = "EGC";
    let baseVal = "ENGN";
    setAsset(assetVal);
    setBase(baseVal);
    let ticker = assetVal + "-" + baseVal;
    if (account) {
      // getPrice(ticker, library.getSigner()).then((data) => {
      //   if (data.status) {
      //     setTickerPrice(parseFloat(formatEther(data.message)));
      //   }
      // });
      getTickerInfo(ticker, library.getSigner()).then((data) => {
        console.log(data.status);
        if (data.status) {
          tokenBalance(data.message.base, account, library.getSigner()).then(
            (balance) => {
              setBaseBalance(formatEther(balance.message));
            }
          );

          if (asset == "BNB" || asset == "bnb") {
            library
              .getBalance(account)
              .then((balance) => {
                setCoinBalance2(formatEther(balance));
              })
              .catch(() => {
                setCoinBalance2(null);
              });
          } else {
            tokenBalance(data.message.asset, account, library.getSigner()).then(
              (balance) => {
                setCoinBalance2(formatEther(balance.message));
              }
            );
          }
          // const checkUnlock = async () => {
          //   let engn = await checkAllowance(
          //     data.base,
          //     account,
          //     parseEther("5000000", "wei").toString(),
          //     library.getSigner()
          //   );

          //   let egc = await checkAllowance(
          //     data.asset,
          //     account,
          //     parseEther("5000000", "wei").toString(),
          //     library.getSigner()
          //   );
          // };

          // setLoanMetaData({
          //   ...loanMetaData,
          //   base: data.message.base,
          //   asset: data.message.asset,
          //   maxLoan: formatEther(data.message.maxLoan),
          //   // maxLoan: formatEther(data.message.maxLoan),
          // });
        }
      });
    }
  }, [chainId, account, connector, baseBalance, coinBalance2]);

  // console.log(baseBalance);
  // console.log(coinBalance2);

  useEffect(
    async (e) => {
      let string =
        "https://api.coingecko.com/api/v3/simple/price?ids=egoras&vs_currencies=usd&include_market_cap=false&include_24hr_vol=false&include_24hr_change=true&include_last_updated_at=true";
      await fetch(string)
        .then((resp) => resp.json())
        .then((data) => {
          const egr_usd_val = data["egoras"].usd;
          console.log(egr_usd_val);
          setEgrUsdVal(() => egr_usd_val);
        })
        .catch((error) => {
          console.log(error);
        });
      // ===============================
      let string2 =
        "https://api.coingecko.com/api/v3/simple/price?ids=egoras-credit&vs_currencies=usd&include_market_cap=false&include_24hr_vol=false&include_24hr_change=true&include_last_updated_at=true";
      await fetch(string2)
        .then((resp) => resp.json())
        .then((data) => {
          const egc_usd_val = data["egoras-credit"].usd;
          console.log(egc_usd_val);
          setEgcUsdVal(() => egc_usd_val);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    [egcUsdVal, egrUsdVal]
  );

  // const chainIdBsc = "56";
  const chainIdBsc = "97";

  useEffect(() => {
    if (account) {
      web3.eth.net
        .getId()
        .then((networkId) => {
          if (networkId != chainIdBsc) {
            setConnectId(() => true);
            console.log(
              "You are not on the right network please connect to BSC"
            );
          } else {
            setConnectId(() => false);

            console.log(
              "You are  on the right network please carry out transaction"
            );
          }
        })
        .catch((err) => {
          // unable to retrieve network id
        });
    } else {
      setConnectId(() => false);
    }
  });

  useEffect(() => {
    if (window.ethereum) {
      setConnectNewAccountBtn(false);
    } else {
      setConnectNewAccountBtn(true);
    }
  });

  const switchNetwork = async () => {
    // if (window.ethereum) {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: web3.utils.toHex(chainIdBsc) }],
      });
    } catch (err) {
      // This error code indicates that the chain has not been added to MetaMask
      if (err.code === 4902) {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainName: "Binance Smart Chain",
              chainId: web3.utils.toHex(chainIdBsc),
              nativeCurrency: {
                name: "Smart Chain",
                decimals: 18,
                symbol: "BNB",
              },
              rpcUrls: ["https://bsc-dataseed.binance.org/"],
            },
          ],
        });
      }
    }
    // } else {
    //   setConnectNewAccountBtn(true);
    // }
  };
  return (
    <div className={smallSide == "not_small" ? "side" : "small_side"}>
      <div className="header_token_prices_div">
        <div className="container-fluid">
          <div className="header_token_prices_div_area">
            <div className="header_token_prices_div_area1">
              {nairaValue} NGN ~ 1 USD
            </div>
            <span class="vertical_rule2"></span>
            <div className="header_token_prices_div_area1">
              {nairaValue} ENGN ~ 1 USD
            </div>
            <span class="vertical_rule2"></span>
            <div className="header_token_prices_div_area1">
              1 EGC ~ {numberWithCommas(egcUsdVal.toFixed(2))} USD
            </div>
            <span class="vertical_rule2"></span>
            <div className="header_token_prices_div_area1">
              1 EGR ~ {egrUsdVal.toFixed(3)} USD
            </div>
            <span class="vertical_rule2"></span>
            <div className="header_token_prices_div_area1">1 ENGN ~ 1 NGN</div>
            <span class="vertical_rule2"></span>
            <div className="header_token_prices_div_area1">
              1 EGC ~ {numberWithCommas((egcUsdVal * nairaValue).toFixed(2))}{" "}
              NGN
            </div>
            <span class="vertical_rule2"></span>
            <div className="header_token_prices_div_area1">
              1 EGR ~ {(egrUsdVal * nairaValue).toFixed(2)} NGN
            </div>
          </div>
        </div>
      </div>
      <section className="DashBoardHeaderSection">
        <div className="container-fluid">
          <div className="dashboard-area">
            <a href="/" className="egr_logo2_mobil">
              <img src="/img/egoras-logo.svg" alt="..." className="egr-logo2" />
              <img
                src="/img/logoVideoThumbnail.svg"
                alt="..."
                className="egr-logo2dark"
              />
              <div className="on-mobile-navigators"></div>
            </a>
            <div className="egrLogo2Cont3">
              <a href="/">
                {" "}
                <img
                  src="/img/egoras-logo.svg"
                  alt="..."
                  className="egr-logo"
                />
                <img
                  src="/img/logoVideoThumbnail.svg"
                  alt="..."
                  className="egr-logodark"
                />
              </a>
            </div>
            <div className="header_tabs">
              <a
                id="lend"
                href="/admin"
                className={
                  activeBg == "lend" ? "header_tab1_active " : "header_tab1"
                }
                onClick={changeBg}
              >
                Home
              </a>
              <a
                id="sellers"
                href="/admin/sellers"
                className={
                  activeBg == "sellers" ? "header_tab1_active " : "header_tab1"
                }
                onClick={changeBg}
              >
                Sellers
              </a>
              <a
                id="transactions"
                href="/admin/staff"
                className={
                  activeBg == "transactions"
                    ? "header_tab1_active "
                    : "header_tab1"
                }
                onClick={changeBg}
              >
                Staff
              </a>
              <a
                id="products"
                href="/admin/all/products"
                className={
                  activeBg == "products" ? "header_tab1_active " : "header_tab1"
                }
                onClick={changeBg}
              >
                Products
              </a>
              <a
                id="membership"
                href="/admin/modify/membership_plan"
                className={
                  activeBg == "membership"
                    ? "header_tab1_active "
                    : "header_tab1"
                }
                onClick={changeBg}
              >
                Membership
              </a>
              <a
                id="router"
                href="/admin/setRouter"
                className={
                  activeBg == "router" ? "header_tab1_active " : "header_tab1"
                }
                onClick={changeBg}
              >
                Set Router
              </a>
              <a
                id="priceOracle"
                href="/admin/priceOracle"
                className={
                  activeBg == "priceOracle"
                    ? "header_tab1_active "
                    : "header_tab1"
                }
                onClick={changeBg}
              >
                Price Oracle
              </a>

              {/* <a
                id="market"
                href="/app/stake"
                className={
                  activeBg == "market" ? "header_tab1_active " : "header_tab1"
                }
                onClick={changeBg}
              >
                Stake
              </a>
              <a
                id="swap"
                href="/app/swap"
                className={
                  activeBg == "swap" ? "header_tab1_active " : "header_tab1"
                }
                onClick={changeBg}
              >
                Swap
              </a>
              <a
                id="account"
                href="/app/user"
                className={
                  activeBg == "account" ? "header_tab1_active " : "header_tab1"
                }
                onClick={changeBg}
              >
                Account
              </a> */}
            </div>
            <div className="user_profile_icon_cont2">
              <div className="together">
                <div className="header_menu_icon_con_dash">
                  <Hamburger toggled={isOpen} toggle={setIsOpen} />
                </div>
                <div className="toggle_dark_mode_div">
                  <SwitchToggle2
                    className="toggle_dark_mode"
                    darkMode={togglemakeDark}
                    checkBox={check}
                  />
                </div>
                {account ? (
                  <div className="connected_header_address dash_connected_header_address">
                    <p className="header_wllt_bal">
                      {" "}
                      <AccountBalanceWalletIcon className="header_wllt_bal_icon" />
                      {coinBalance} BNB
                    </p>
                    <div
                      className="metamask_prof_pic_icon"
                      ref={avatarRef}
                    ></div>

                    <div className="wallet_addr_cont_txt_header">
                      <div className="wall_addr">{walletAddr}</div>
                    </div>
                    <div
                      className="wallet_settings_icon_cont"
                      onClick={toggleDisconnectDiv}
                    >
                      <SettingsOutlinedIcon className="wallet_settings_icon" />
                    </div>

                    {disconnetDiv === true ? (
                      <div className="disconnect_button_div">
                        <Authenticate isHome="false" />
                      </div>
                    ) : null}
                  </div>
                ) : (
                  <div className="connect_div_dash_head">
                    <Authenticate isHome="false" />
                  </div>
                )}
              </div>
            </div>
          </div>
          {isOpen === true ? (
            <div className="mobile_view_header_cont_head_body_dash">
              <div className="mobile_view_header_cont_head_body_cont1">
                <div className="mobile_view_header_cont_head_body_cont1_title">
                  Balance:
                </div>
                <div className="mobile_view_header_cont_head_body_cont1_para">
                  <p className="header_wllt_bal">
                    {" "}
                    <AccountBalanceWalletIcon className="header_wllt_bal_icon" />
                    {coinBalance} BNB
                  </p>
                </div>
              </div>

              <span className="header_rule"></span>
              <div className="mobile_view_header_cont_head_body_cont1">
                <div className="mobile_view_header_cont_head_body_cont1_title">
                  Account
                </div>
                <div className="mobile_view_header_cont_head_body_cont1_para">
                  <div className="metamask_prof_pic_icon" ref={avatarRef}></div>
                  {/* <div className="wallet_addr_cont_txt_header"> */}
                  <div className="wall_addr2">{walletAddr}</div>
                  {/* </div> */}
                </div>
              </div>
              <span className="header_rule"></span>
              <div className="mobile_view_header_cont_head_body_cont1_btn">
                <Authenticate isHome="false" />
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <div className="header_tabs2">
        <a
          id="lend"
          href="/app"
          className={activeBg == "lend" ? "header_tab1_active " : "header_tab1"}
          onClick={changeBg}
        >
          <HomeIcon className="sidebarIcon" />
          Home
        </a>

        <a
          id="sellers"
          href="/admin/sellers"
          className={
            activeBg == "sellers" ? "header_tab1_active " : "header_tab1"
          }
          onClick={changeBg}
        >
          <StorageIcon className="sidebarIcon" />
          Sellers
        </a>
        <a
          id="transactions"
          href="/admin/staff"
          className={
            activeBg == "transactions" ? "header_tab1_active " : "header_tab1"
          }
          onClick={changeBg}
        >
          <ReceiptLongIcon className="sidebarIcon" />
          Staff
        </a>
        <a
          id="membership"
          href="/admin/modify/membership_plan"
          className={
            activeBg == "membership" ? "header_tab1_active " : "header_tab1"
          }
          onClick={changeBg}
        >
          <ReceiptLongIcon className="sidebarIcon" />
          Membership
        </a>
      </div>
      {/* =============''''''''' */}
      {/* =============''''''''' */}
      {/* =============''''''''' */}

      {/* ========== */}
      {/* ========== */}
      {/* ========== */}
      {connectId == true ? (
        <div className="right_network_id_modal_div">
          <div className="right_network_id_modal_cont">
            {/* <div className="close_chain_icon_cont">
              <CloseIcon
                className="close_chain_icon"
                onClick={() => {
                  setConnectId(!connectId);
                }}
              />
            </div> */}
            <div className="change_network_img">
              <img
                src="/img/smart_chain_id_change_image.svg"
                alt=""
                className="chain_id_img"
              />
            </div>
            Oops, your wallet is not on the right network.
            <span className="right_network_id_modal_cont_para">
              It seems your wallet is running on a different network from
              Egoras.app. Please click the button below to change your network
              or add the network if it's not added in your wallet.
            </span>
            <div className="change_network_btn_div">
              <button className="changeNetworkBtn" onClick={switchNetwork}>
                Switch Network
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

// const mapStateToProps = (state) => ({
//   auth: state.auth,
//   isAuthenticated: state.auth.isAuthenticated,
//   cart: state.shop.cart,
// });

export default AdminSideBar;

// export default connect(mapStateToProps, { retrieveCart })(DashboardSidebar);
