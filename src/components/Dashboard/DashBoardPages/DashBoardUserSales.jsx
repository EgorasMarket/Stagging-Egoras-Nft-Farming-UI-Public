import React, { useState, useEffect, useContext } from "react";
// import CircleIcon from "@mui/icons-material/Circle";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
// import EastIcon from "@mui/icons-material/East";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
// import Accordion from "@material-ui/core/Accordion";
// import AccordionSummary from "@material-ui/core/AccordionSummary";
// import AccordionDetails from "@material-ui/core/AccordionDetails";
// import Typography from "@material-ui/core/Typography";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import CopyAllIcon from "@mui/icons-material/CopyAll";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";
import { numberWithCommas } from "../../../static";
import Nodata from "./nodataComponent/Nodata";
import UserDetailsLinks from "./UserDetailsLinks";
import CloseIcon from "@mui/icons-material/Close";
// import GroupAddIcon from "@mui/icons-material/GroupAdd";
// import TrendingDownIcon from "@mui/icons-material/TrendingDown";
// import TrendingDownIcon from "@mui/icons-material/TrendingDown";
// import { Link } from "react-router-dom";
import {
  // Web3ReactProvider,
  useWeb3React,
  // UnsupportedChainIdError,
} from "@web3-react/core";
import {
  // GET_ALL_UPLOADED_PRODUCTS,
  ACCEPT_BID,
  DISPLAY_NEW_USER_PRODUCTS_CALL,
  CALL_USER_INDIRECT_PRODUCTS_STATS,
  CALL_USER_INDIRECT_BUY_ORDER,
  CALL_EXPRESS_BUY_ORDER_STATS,
} from "../../../services/productServices";
// import { DISPLAY_NEW_PRODUCTS_CALL } from "../../../services/adminServices";
import { AcceptBid } from "../../../web3";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));
const DashBoardUserSales = () => {
  const context = useWeb3React();
  const {
    // connector,
    library,
    // chainId,
    account,
    // activate,
    // deactivate,
    // active,
    // error,
  } = context;
  const [lockedValue, setLockedValue] = useState(0);
  const [totalLendingCapacity, setTotalLendingCapacity] = useState(0);
  const [approvedProdCount, setApprovedProdCount] = useState(0);
  const [approvedProdSum, setApprovedProdSum] = useState(0);
  const [uploadedProdCount, setUploadedProdCount] = useState(0);
  const [uploadedProdSum, setUploadedProdSum] = useState(0);
  // const [totalLendingCount, setTotalLendingCount] = useState(0);
  const [activeBtn, setActivrBtn] = useState("Ongoing");
  const [indexId, setIndexId] = useState(null);
  const [totalItemBoughtCount, setTotalItemBoughtCount] = useState(0);
  const [totalItemBoughtAmount, setTotalItemBoughtAmount] = useState(0);
  const [saleDetails, setSaleDetails] = useState("");
  const [activeLink, setActiveLink] = useState("abstract-link");
  const [activeMenu, setActiveMenu] = useState("details-accord  ");
  const [activeTab, setActiveTab] = useState("seller");

  const toggleActiveBtn = (event) => {
    setActivrBtn(event.currentTarget.id);
  };

  const [uploadedProduct, setUploadedProducts] = useState([]);
  const [expressBuyOrders, setExpressBuyOrders] = useState([]);

  useEffect(() => {
    console.log("kddd_____");
    const fetchData = async () => {
      const response = await DISPLAY_NEW_USER_PRODUCTS_CALL(account);
      console.log(response.data, "goody");

      if (response.data) {
        setUploadedProducts(response.data);
      }
    };

    const fetchData2 = async () => {
      const response = await CALL_USER_INDIRECT_PRODUCTS_STATS(account);
      console.log(response.data, "goody__");

      if (response.data) {
        setUploadedProdSum(response.data.uploaded[0].totalSum);
        setUploadedProdCount(response.data.uploaded[0].totalCOunt);
        setApprovedProdSum(response.data.approved[0].totalSum);
        setApprovedProdCount(response.data.approved[0].totalCOunt);
        // setUploadedProducts(response.data);
      }
    };

    const fetchData3 = async () => {
      const response = await CALL_USER_INDIRECT_BUY_ORDER(account);
      console.log(response.data, "goody__");

      if (response.data) {
        setExpressBuyOrders(response.data);
      }
    };

    const fetchData4 = async () => {
      const response = await CALL_EXPRESS_BUY_ORDER_STATS(account);
      console.log(response.data, "goody__");
      // setTotalItemBoughtCount] = useState(0);
      // const [totalItemBoughtAmount, setTotalItemBoughtAmount] = useState(0);
      if (response.data) {
        setTotalItemBoughtCount(response.data.sumCount);
        setTotalItemBoughtAmount(response.data.totalAmount);
      }
    };

    fetchData();
    fetchData2();
    fetchData3();
    fetchData4();
  }, [account]);

  const handleAcceptBid = async (action) => {
    // AcceptBid
    console.log(account, saleDetails, action);

    if (action == 1) {
      const res = await AcceptBid(indexId, library.getSigner());
      console.log(res, "somto8uhhhg");
    } else {
      const offChainRes = await ACCEPT_BID(account, saleDetails, action);
      console.log(offChainRes);
    }

    // console.log(res.status, "somto8uhhhg");
  };
  const ToggleSaleDetails = (product_id, index_id) => {
    setSaleDetails(product_id);
    setIndexId(index_id);
    console.log(product_id);
  };
  const toggleActive = (e) => {
    let link = e.currentTarget.id;
    setActiveLink(link);

    setActiveMenu("notDetails-accord ");

    console.log(e.currentTarget.id);
  };

  const toggleActiveDrop = () => {
    setActiveMenu("details-accord ");
  };

  const classes = useStyles();
  const currentPage = window.location.pathname;
  const urlArr = currentPage.split("/");
  useEffect(() => {
    if (currentPage === "/app/user") {
      setActiveLink("poolDetails");
      return;
    }
    if (currentPage === "/app/user/referral") {
      setActiveLink("referral");
      return;
    }
    if (currentPage === "/app/user/sales") {
      setActiveLink("sales");
      return;
    }
  });
  const buyOrders = [
    {
      id: "1",
      img: "/img/img5.png",
      name: "Hisense Tv",
      amount: 10000,
      seller: "0x3dE79168402278C0DA2Bf9A209C3A91d755790FC",
      status: "Pending",
      time: "Apr-05-2023",
      txHash:
        "0xa5c4bec11d4563d2ab163922b275d31e0b9b2c039082ba1afccc4c9180b51a37",
    },
    {
      id: "2",
      img: "/img/img5.png",
      name: "Lg Tv",
      amount: 10000,
      seller: "0x3dE79168402278C0DA2Bf9A209C3A91d755790FC",
      status: "Pending",
      time: "Apr-05-2023",
      txHash:
        "0xa5c4bec11d4563d2ab163922b275d31e0b9b2c039082ba1afccc4c9180b51a37",
    },
    {
      id: "3",
      img: "/img/img5.png",
      name: "Lg Tv",
      amount: 10000,
      seller: "0x3dE79168402278C0DA2Bf9A209C3A91d755790FC",
      status: "delivered",
      time: "Apr-05-2023",
      txHash:
        "0xa5c4bec11d4563d2ab163922b275d31e0b9b2c039082ba1afccc4c9180b51a37",
    },
    {
      id: "4",
      img: "/img/img5.png",
      name: "Lg Tv",
      amount: 10000,
      seller: "0x3dE79168402278C0DA2Bf9A209C3A91d755790FC",
      status: "Pending",
      time: "Apr-05-2023",
      txHash:
        "0xa5c4bec11d4563d2ab163922b275d31e0b9b2c039082ba1afccc4c9180b51a37",
    },
    {
      id: "5",
      img: "/img/img5.png",
      name: "Lg Tv",
      amount: 10000,
      seller: "0x3dE79168402278C0DA2Bf9A209C3A91d755790FC",
      status: "delivered",
      time: "Apr-05-2023",
      txHash:
        "0xa5c4bec11d4563d2ab163922b275d31e0b9b2c039082ba1afccc4c9180b51a37",
    },
    {
      id: "6",
      img: "/img/img5.png",
      name: "Samsung Tv",
      amount: 10000,
      seller: "0x3dE79168402278C0DA2Bf9A209C3A91d755790FC",
      status: "delivered",
      time: "Apr-05-2023",
      txHash:
        "0xa5c4bec11d4563d2ab163922b275d31e0b9b2c039082ba1afccc4c9180b51a37",
    },
  ];
  const toggleActiveTab = (e) => {
    let active = e.currentTarget.id;
    setActiveTab(active);
  };
  return (
    <div className="other2 asset_other2">
      {/* get started section start */}
      {/* ============================================================ */}
      {/* ============================================================ */}
      {/* ============================================================ */}
      {/* ============================================================ */}
      {/* Tokens Section Start */}
      <section className=" no-bg no_paddd ">
        <div className="container relative">
          <div className="pool_deatail_area">
            <UserDetailsLinks activeLink={activeLink} />
            <div className="BuyerSellerDiv">
              <div className="BuyerSellerDiv_tabs">
                <div
                  id="seller"
                  className={
                    activeTab === "seller"
                      ? "BuyerSellerDiv_tab1_active"
                      : "BuyerSellerDiv_tab1"
                  }
                  onClick={toggleActiveTab}
                >
                  Sales Uploads
                </div>
                <div
                  id="buyer"
                  className={
                    activeTab === "buyer"
                      ? "BuyerSellerDiv_tab1_active"
                      : "BuyerSellerDiv_tab1"
                  }
                  onClick={toggleActiveTab}
                >
                  Buy Orders
                </div>
              </div>
              {activeTab === "buyer" ? (
                <div className="BuyerSellerDiv_body">
                  <div className="BuyerSellerDiv_body_div1">
                    <div className="BuyerSellerDiv_body_div1_text">
                      Buyer Overview
                    </div>
                    <div className="lending_area1">
                      <div className="lending_area1_cont1_user">
                        <div className="lending_area1_cont1_body_1">
                          <div className="lending_area1_cont1_heading">
                            Total amount of items bought
                          </div>
                          <div className="lending_area1_cont1_body_txt">
                            {totalItemBoughtCount}
                            <span className="usd_sign"> items</span>
                          </div>
                        </div>
                        <div className="lending_area1_cont1_body_1">
                          <HelpOutlineIcon className="help_outline" />
                          <div className="helper_txt_div">
                            This is the total value of all the assets in the
                            lending pool.
                          </div>
                        </div>
                      </div>

                      <div className="lending_area1_cont1_user">
                        <div className="lending_area1_cont1_body_1">
                          <div className="lending_area1_cont1_heading">
                            Total price of items Bought
                          </div>
                          <div className="lending_area1_cont1_body_txt">
                            {numberWithCommas(
                              parseInt(totalItemBoughtAmount).toFixed(2)
                            )}
                            <span className="usd_sign"> eusd</span>
                          </div>
                        </div>
                        <div className="lending_area1_cont1_body_1">
                          <HelpOutlineIcon className="help_outline" />
                          <div className="helper_txt_div">
                            This is the total value of all the assets in the
                            lending pool.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="BuyerSellerDiv_body_div2">
                    <div className="BuyerSellerDiv_body_div2_tab_area">
                      <div className="filter_table_area_1">Buy Orders</div>
                      <div className="filter_table_area_2">
                        <div
                          id="Ongoing"
                          className={
                            activeBtn == "Ongoing"
                              ? "filter_table_btn1_active"
                              : "filter_table_btn1"
                          }
                          onClick={toggleActiveBtn}
                        >
                          Pending
                        </div>
                        <div
                          id="All"
                          className={
                            activeBtn == "All"
                              ? "filter_table_btn1_active"
                              : "filter_table_btn1"
                          }
                          onClick={toggleActiveBtn}
                        >
                          All
                        </div>
                        <div
                          id="Closed"
                          className={
                            activeBtn == "Closed"
                              ? "filter_table_btn1_active"
                              : "filter_table_btn1"
                          }
                          onClick={toggleActiveBtn}
                        >
                          Delivered
                        </div>
                      </div>
                    </div>
                    <div className="BuyerSellerDiv_body_div2_body">
                      <table className="assets-table">
                        <thead className="assets-category-titles">
                          <tr className="assets">
                            <th className="assets-category-titles-heading1 left">
                              Product Name
                            </th>
                            <th className="assets-category-titles-heading1">
                              Amount
                            </th>
                            <th className="assets-category-titles-heading1 ">
                              Seller
                            </th>
                            <th className="assets-category-titles-heading1  ">
                              Product Status
                            </th>
                            <th className="assets-category-titles-heading1 ">
                              Txn hash
                            </th>
                          </tr>
                        </thead>

                        {/* <div className="table-body-content">

// =====================
// =====================
// =====================
// =====================
// =====================
// =====================

                
              </div> */}
                        {expressBuyOrders.length <= 0 ? (
                          <div className="no_loans_div">
                            <div className="no_loans_div_cont">
                              <Nodata />
                              No Pools yet.
                            </div>{" "}
                          </div>
                        ) : (
                          <tbody
                            className="assets-table-body popular-categories transitionMe"
                            id="popular-categories"
                          >
                            {" "}
                            {/* =============== */}
                            {/* =============== */}
                            {/* =============== */}
                            {activeBtn === "Ongoing"
                              ? expressBuyOrders
                                  .filter(
                                    (person) => person.status == "PENDING"
                                  )
                                  .map((asset) => {
                                    console.log(asset);
                                    //   var percentage = (asset.funded / asset.amount) * 100;
                                    return (
                                      <tr
                                        className="assets-category-row  transitionMe"
                                        id={asset.product_id}
                                      >
                                        <td className="assets-category-data branch_name_title">
                                          <div className="assets-data">
                                            <div className="assets-data-pool_name">
                                              {asset.item_name}
                                              <span className="poolName_txt">
                                                {asset.createdAt}
                                              </span>
                                            </div>
                                          </div>
                                        </td>
                                        <td className="assets-category-data1b branch_apy">
                                          {numberWithCommas(
                                            parseInt(asset.amount).toFixed(0)
                                          )}{" "}
                                          Eusd
                                        </td>
                                        <td className="assets-category-data1b branch_apy">
                                          {`${asset.seller.slice(
                                            0,
                                            6
                                          )}...${asset.seller.slice(39, 42)}`}
                                        </td>

                                        <td className="assets-category-data1b branch_apy">
                                          {asset.status}
                                        </td>
                                        <td className="assets-category-data1b branch_apy">
                                          {asset.transactionHash != null
                                            ? `${asset.transactionHash.slice(
                                                0,
                                                6
                                              )}...${asset.transactionHash.slice(
                                                63,
                                                66
                                              )}`
                                            : "N/A"}
                                        </td>
                                        <td className="assets-category-data-last branch_loan_action">
                                          <ArrowForwardIosIcon />
                                        </td>
                                      </tr>
                                    );
                                  })
                              : activeBtn === "All"
                              ? expressBuyOrders.map((asset) => {
                                  return (
                                    <tr
                                      className="assets-category-row  transitionMe"
                                      id={asset.id}
                                    >
                                      <td className="assets-category-data branch_name_title">
                                        <div className="assets-data">
                                          <div className="assets-data-pool_name">
                                            {asset.item_name}
                                            <span className="poolName_txt">
                                              {asset.createdAt}
                                            </span>
                                          </div>
                                        </div>
                                      </td>
                                      <td className="assets-category-data1b branch_apy">
                                        {numberWithCommas(
                                          parseInt(asset.amount).toFixed(0)
                                        )}{" "}
                                        Eusd
                                      </td>
                                      <td className="assets-category-data1b branch_apy">
                                        {`${asset.seller.slice(
                                          0,
                                          6
                                        )}...${asset.seller.slice(39, 42)}`}
                                      </td>

                                      <td className="assets-category-data1b branch_apy">
                                        {asset.status}
                                      </td>
                                      <td className="assets-category-data1b branch_apy">
                                        {`${asset.transactionHash.slice(
                                          0,
                                          6
                                        )}...${asset.transactionHash.slice(
                                          63,
                                          66
                                        )}`}
                                      </td>
                                      <td className="assets-category-data-last branch_loan_action">
                                        <ArrowForwardIosIcon />
                                      </td>
                                    </tr>
                                  );
                                })
                              : activeBtn === "Closed"
                              ? expressBuyOrders
                                  .filter(
                                    (person) => person.status == "DELIVERED"
                                  )
                                  .map((asset) => {
                                    return (
                                      <tr
                                        className="assets-category-row  transitionMe"
                                        id={asset.id}
                                      >
                                        <td className="assets-category-data branch_name_title">
                                          <div className="assets-data">
                                            <div className="assets-data-pool_name">
                                              {asset.item_name}
                                              <span className="poolName_txt">
                                                {asset.createdAt}
                                              </span>
                                            </div>
                                          </div>
                                        </td>
                                        <td className="assets-category-data1b branch_apy">
                                          {numberWithCommas(
                                            parseInt(asset.amount).toFixed(0)
                                          )}{" "}
                                          Eusd
                                        </td>
                                        <td className="assets-category-data1b branch_apy">
                                          {`${asset.seller.slice(
                                            0,
                                            6
                                          )}...${asset.seller.slice(39, 42)}`}
                                        </td>

                                        <td className="assets-category-data1b branch_apy">
                                          {asset.status}
                                        </td>
                                        <td className="assets-category-data1b branch_apy">
                                          {`${asset.transactionHash.slice(
                                            0,
                                            6
                                          )}...${asset.transactionHash.slice(
                                            63,
                                            66
                                          )}`}
                                        </td>
                                        <td className="assets-category-data-last branch_loan_action">
                                          <ArrowForwardIosIcon />
                                        </td>
                                      </tr>
                                    );
                                  })
                              : null}
                            {/* =================== */}
                            {/* =================== */}
                            {/* =================== */}
                            {/* =================== */}
                            {/* =================== */}
                            {/* =================== */}
                            {/* =================== */}
                            {/* =================== */}
                            {/* =================== */}
                            {/* =================== */}
                            {/* =================== */}
                            {/* =================== */}
                          </tbody>
                        )}
                      </table>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="sellers_overview_area">
                  <div className="lending_area1">
                    <div className="lending_area1_cont1">
                      <div className="lending_area1_cont1_body_1">
                        <div className="lending_area1_cont1_heading">
                          Total Products uploaded for sale
                        </div>
                        <div className="lending_area1_cont1_body_txt">
                          {uploadedProdCount}{" "}
                        </div>
                      </div>
                      <div className="lending_area1_cont1_body_1">
                        <HelpOutlineIcon className="help_outline" />
                        <div className="helper_txt_div">
                          This is the total Engn funded to all assets in the
                          lending pool.
                        </div>
                      </div>
                    </div>
                    <div className="lending_area1_cont1">
                      <div className="lending_area1_cont1_body_1">
                        <div className="lending_area1_cont1_heading">
                          Total Products Approved
                        </div>
                        <div className="lending_area1_cont1_body_txt">
                          {approvedProdCount}{" "}
                          {/* <span className="usd_sign">USD</span> */}
                        </div>
                      </div>
                      <div className="lending_area1_cont1_body_1">
                        <HelpOutlineIcon className="help_outline" />
                        <div className="helper_txt_div">
                          This is the total Engn funded to all assets in the
                          lending pool.
                        </div>
                      </div>
                    </div>

                    <div className="lending_area1_cont1">
                      <div className="lending_area1_cont1_body_1">
                        <div className="lending_area1_cont1_heading">
                          Total Amount Products Uploaded
                        </div>
                        <div className="lending_area1_cont1_body_txt">
                          {numberWithCommas(
                            parseInt(uploadedProdSum).toFixed(2)
                          )}{" "}
                          <span className="usd_sign">NGN</span>
                        </div>
                      </div>
                      <div className="lending_area1_cont1_body_1">
                        <HelpOutlineIcon className="help_outline" />
                        <div className="helper_txt_div">
                          This is the total value of all the assets in the
                          lending pool.
                        </div>
                      </div>
                    </div>

                    <div className="lending_area1_cont1">
                      <div className="lending_area1_cont1_body_1">
                        <div className="lending_area1_cont1_heading">
                          Total Amount Products Approved
                        </div>
                        <div className="lending_area1_cont1_body_txt">
                          {numberWithCommas(
                            parseInt(approvedProdSum).toFixed(2)
                          )}{" "}
                          <span className="usd_sign">NGN</span>
                        </div>
                      </div>
                      <div className="lending_area1_cont1_body_1">
                        <HelpOutlineIcon className="help_outline" />
                        <div className="helper_txt_div">
                          This is the total value of all the assets in the
                          lending pool.
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* ============== */}
                  {/* ============== */}
                  {/* ============== */}
                  {/* ============== */}
                  {/* ============== */}
                  {/* ============== */}
                  {/* ============== */}
                  <div className="table_body">
                    <div className="filter_table_area">
                      <div className="filter_table_area_1">Uploaded Sales</div>
                      <div className="filter_table_area_2">
                        <div
                          id="Ongoing"
                          className={
                            activeBtn == "Ongoing"
                              ? "filter_table_btn1_active"
                              : "filter_table_btn1"
                          }
                          onClick={toggleActiveBtn}
                        >
                          Pending
                        </div>
                        <div
                          id="All"
                          className={
                            activeBtn == "All"
                              ? "filter_table_btn1_active"
                              : "filter_table_btn1"
                          }
                          onClick={toggleActiveBtn}
                        >
                          All
                        </div>
                        <div
                          id="Closed"
                          className={
                            activeBtn == "Closed"
                              ? "filter_table_btn1_active"
                              : "filter_table_btn1"
                          }
                          onClick={toggleActiveBtn}
                        >
                          Approved
                        </div>
                      </div>
                    </div>
                    <table className="assets-table">
                      <thead className="assets-category-titles">
                        <tr className="assets">
                          <th className="assets-category-titles-heading1 left">
                            Product Name
                          </th>
                          <th className="assets-category-titles-heading1">
                            Sales Amount
                          </th>
                          <th className="assets-category-titles-heading1 ">
                            Seller
                          </th>
                          <th className="assets-category-titles-heading1 ">
                            Bidding Status
                          </th>
                          <th className="assets-category-titles-heading1 ">
                            Bidding Amount
                          </th>
                          <th className="assets-category-titles-heading1  ">
                            Product Status
                          </th>
                          <th className="assets-category-titles-heading1 ">
                            Txn hash
                          </th>
                        </tr>
                      </thead>

                      {/* <div className="table-body-content">

// =====================
// =====================
// =====================
// =====================
// =====================
// =====================

                
              </div> */}
                      {uploadedProduct.length <= 0 ? (
                        <div className="no_loans_div">
                          <div className="no_loans_div_cont">
                            <Nodata />
                            No Pools yet.
                          </div>{" "}
                        </div>
                      ) : (
                        <tbody
                          className="assets-table-body popular-categories transitionMe"
                          id="popular-categories"
                        >
                          {" "}
                          {/* =============== */}
                          {/* =============== */}
                          {/* =============== */}
                          {activeBtn === "Ongoing"
                            ? uploadedProduct
                                .filter((person) => person.status == "NEW")
                                .map((asset) => {
                                  // console.log(asset);
                                  //   var percentage = (asset.funded / asset.amount) * 100;
                                  return (
                                    <tr
                                      className="assets-category-row  transitionMe"
                                      id={asset.product_id}
                                      // onClick={ToggleSaleDetails}
                                      onClick={() => {
                                        ToggleSaleDetails(
                                          asset.product_id,
                                          asset.index_id
                                        );
                                      }}
                                    >
                                      <td className="assets-category-data branch_name_title">
                                        <div className="assets-data">
                                          <div className="assets-data-pool_name">
                                            {asset.product_name}
                                            <span className="poolName_txt">
                                              {asset.createdAt}
                                            </span>
                                          </div>
                                        </div>
                                      </td>
                                      <td className="assets-category-data1b branch_apy">
                                        {numberWithCommas(
                                          parseInt(asset.user_amount).toFixed(0)
                                        )}{" "}
                                        Eusd
                                      </td>
                                      <td className="assets-category-data1b branch_apy">
                                        {`${asset.user_wallet.slice(
                                          0,
                                          6
                                        )}...${asset.user_wallet.slice(
                                          39,
                                          42
                                        )}`}
                                      </td>
                                      <td className="assets-category-data1b branch_apy">
                                        {asset.bidAmount != null
                                          ? asset.bidStatus
                                          : "N/A"}
                                      </td>
                                      <td className="assets-category-data1b branch_apy">
                                        {asset.bidAmount != null
                                          ? numberWithCommas(
                                              parseInt(asset.bidAmount).toFixed(
                                                0
                                              ) + " Eusd"
                                            )
                                          : "N/A"}{" "}
                                      </td>
                                      <td className="assets-category-data1b branch_apy">
                                        {asset.status == "NEW"
                                          ? "Pending Approval"
                                          : asset.status}
                                      </td>
                                      <td className="assets-category-data1b branch_apy">
                                        {asset.transaction_hash != null
                                          ? `${asset.transaction_hash.slice(
                                              0,
                                              6
                                            )}...${asset.transaction_hash.slice(
                                              63,
                                              66
                                            )}`
                                          : "N/A"}
                                      </td>
                                      <td className="assets-category-data-last branch_loan_action">
                                        <ArrowForwardIosIcon />
                                      </td>
                                    </tr>
                                  );
                                })
                            : activeBtn === "All"
                            ? uploadedProduct.map((asset) => {
                                console.log(uploadedProduct);
                                return (
                                  <tr
                                    className="assets-category-row  transitionMe"
                                    id={asset.product_id}
                                    // onClick={ToggleSaleDetails}
                                    onClick={() => {
                                      ToggleSaleDetails(
                                        asset.product_id,
                                        asset.index_id
                                      );
                                    }}
                                  >
                                    <td className="assets-category-data branch_name_title">
                                      <div className="assets-data">
                                        <div className="assets-data-pool_name">
                                          {asset.product_name}
                                          <span className="poolName_txt">
                                            {asset.createdAt}
                                          </span>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="assets-category-data1b branch_apy">
                                      {numberWithCommas(
                                        parseInt(asset.user_amount).toFixed(0)
                                      )}{" "}
                                      Eusd
                                    </td>
                                    <td className="assets-category-data1b branch_apy">
                                      {`${asset.user_wallet.slice(
                                        0,
                                        6
                                      )}...${asset.user_wallet.slice(39, 42)}`}
                                    </td>
                                    <td className="assets-category-data1b branch_apy">
                                      {asset.bidAmount != null
                                        ? asset.bidStatus
                                        : "N/A"}
                                    </td>
                                    <td className="assets-category-data1b branch_apy">
                                      {asset.bidAmount != null
                                        ? numberWithCommas(
                                            parseInt(asset.bidAmount).toFixed(
                                              0
                                            ) + " Eusd"
                                          )
                                        : "N/A"}{" "}
                                    </td>
                                    <td className="assets-category-data1b branch_apy">
                                      {asset.status == "NEW"
                                        ? "Pending Approval"
                                        : asset.status}
                                    </td>
                                    <td className="assets-category-data1b branch_apy">
                                      {asset.transaction_hash != null
                                        ? `${asset.transaction_hash.slice(
                                            0,
                                            6
                                          )}...${asset.transaction_hash.slice(
                                            63,
                                            66
                                          )}`
                                        : "N/A"}
                                    </td>
                                    <td className="assets-category-data-last branch_loan_action">
                                      <ArrowForwardIosIcon />
                                    </td>
                                  </tr>
                                );
                              })
                            : activeBtn === "Closed"
                            ? uploadedProduct
                                .filter(
                                  (person) => person.ProductStatus == "Approved"
                                )
                                .map((asset) => {
                                  return (
                                    <tr
                                      className="assets-category-row  transitionMe"
                                      id={asset.id}
                                      onClick={ToggleSaleDetails}
                                    >
                                      <td className="assets-category-data branch_name_title">
                                        <div className="assets-data">
                                          <div className="assets-data-pool_name">
                                            {asset.ProductName}
                                            <span className="poolName_txt">
                                              {asset.Date}
                                            </span>
                                          </div>
                                        </div>
                                      </td>
                                      <td className="assets-category-data1b branch_apy">
                                        {numberWithCommas(
                                          parseInt(asset.Amount).toFixed(0)
                                        )}{" "}
                                        Eusd
                                      </td>
                                      <td className="assets-category-data1b branch_apy">
                                        {`${asset.Seller.slice(
                                          0,
                                          6
                                        )}...${asset.Seller.slice(39, 42)}`}
                                      </td>
                                      <td className="assets-category-data1b branch_apy">
                                        {asset.BiddingStatus}
                                      </td>
                                      <td className="assets-category-data1b branch_apy">
                                        {asset.BiddingAmount} Eusd
                                      </td>
                                      <td className="assets-category-data1b branch_apy">
                                        {asset.ProductStatus}
                                      </td>
                                      <td className="assets-category-data1b branch_apy">
                                        {`${asset.transaction_hash.slice(
                                          0,
                                          6
                                        )}...${asset.transaction_hash.slice(
                                          63,
                                          66
                                        )}`}
                                      </td>
                                      <td className="assets-category-data-last branch_loan_action">
                                        <ArrowForwardIosIcon />
                                      </td>
                                    </tr>
                                  );
                                })
                            : null}
                          {/* =================== */}
                          {/* =================== */}
                          {/* =================== */}
                          {/* =================== */}
                          {/* =================== */}
                          {/* =================== */}
                          {/* =================== */}
                          {/* =================== */}
                          {/* =================== */}
                          {/* =================== */}
                          {/* =================== */}
                          {/* =================== */}
                        </tbody>
                      )}
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {/* ============================= */}
      {saleDetails == ""
        ? null
        : uploadedProduct.map((data) => (
            <>
              {data.product_id === saleDetails ? (
                <div className="saleDetailsDiv">
                  <div
                    className="saleDetailsDiv_close_div"
                    onClick={ToggleSaleDetails}
                  ></div>
                  <div
                    className="saleDetailsDiv_area_closeIcon_div"
                    onClick={ToggleSaleDetails}
                  >
                    <CloseIcon className="saleDetailsDiv_area_closeIcon" />
                    Close
                  </div>
                  <div className="saleDetailsDiv_area">
                    <div className="saleDetailsDiv_area_1">
                      <div className="saleDetailsDiv_area_1_title">
                        Products Details
                      </div>
                      <div className="saleDetailsDiv_area_1_div1">
                        <div className="saleDetailsDiv_area_1_div1_title">
                          Product Images
                        </div>
                        <div className="saleDetailsDiv_area_1_div1_body"></div>
                      </div>
                      <div className="saleDetailsDiv_area_1_div1">
                        <div className="saleDetailsDiv_area_1_div1_title">
                          Product Name
                        </div>
                        <div className="saleDetailsDiv_area_1_div1_body">
                          {data.product_name}
                        </div>
                      </div>
                      <div className="saleDetailsDiv_area_1_div1">
                        <div className="saleDetailsDiv_area_1_div1_title">
                          Product Amount
                        </div>
                        <div className="saleDetailsDiv_area_1_div1_body">
                          {numberWithCommas(
                            parseInt(data.user_amount).toFixed(0)
                          )}{" "}
                          Eusd
                        </div>
                      </div>
                      <div className="saleDetailsDiv_area_1_div1">
                        <div className="saleDetailsDiv_area_1_div1_title">
                          Product Brand Name
                        </div>
                        <div className="saleDetailsDiv_area_1_div1_body">
                          {data.product_brand}
                        </div>
                      </div>
                      <div className="saleDetailsDiv_area_1_div1">
                        <div className="saleDetailsDiv_area_1_div1_title">
                          Product Condition
                        </div>
                        <div className="saleDetailsDiv_area_1_div1_body">
                          {data.product_condition}
                        </div>
                      </div>
                      <div className="saleDetailsDiv_area_1_div1">
                        <div className="saleDetailsDiv_area_1_div1_title">
                          Product Status
                        </div>
                        <div className="saleDetailsDiv_area_1_div1_body">
                          {data.status}
                        </div>
                      </div>
                      <div className="saleDetailsDiv_area_1_div1">
                        <div className="saleDetailsDiv_area_1_div1_title">
                          Product Txn Hash
                        </div>
                        <div className="saleDetailsDiv_area_1_div1_body">
                          {data.transaction_hash}
                          {/* {"N/A"} */}
                        </div>
                      </div>
                      <div className="saleDetailsDiv_area_1_div1">
                        <div className="saleDetailsDiv_area_1_div1_title">
                          Upload Date
                        </div>
                        <div className="saleDetailsDiv_area_1_div1_body">
                          {data.createdAt}
                        </div>
                      </div>
                    </div>
                    {/* ================ */}
                    {/* ================ */}
                    {/* ================ */}
                    {/* ================ */}
                    {/* ================ */}
                    {/* ================ */}
                    <div className="saleDetailsDiv_area_1">
                      <div className="saleDetailsDiv_area_1_title">
                        Seller's Details
                      </div>
                      <div className="saleDetailsDiv_area_1_div1">
                        <div className="saleDetailsDiv_area_1_div1_title">
                          Seller's Full name
                        </div>
                        <div className="saleDetailsDiv_area_1_div1_body">
                          {data.fullName}
                        </div>
                      </div>
                      <div className="saleDetailsDiv_area_1_div1">
                        <div className="saleDetailsDiv_area_1_div1_title">
                          Seller's Wallet Address
                        </div>
                        <div className="saleDetailsDiv_area_1_div1_body">
                          {data.user_wallet}
                        </div>
                      </div>
                      <div className="saleDetailsDiv_area_1_div1">
                        <div className="saleDetailsDiv_area_1_div1_title">
                          Seller's Phone number
                        </div>
                        <div className="saleDetailsDiv_area_1_div1_body">
                          {data.phoneNumber}
                        </div>
                      </div>
                      <div className="saleDetailsDiv_area_1_div1">
                        <div className="saleDetailsDiv_area_1_div1_title">
                          Seller's Residential Address
                        </div>
                        <div className="saleDetailsDiv_area_1_div1_body">
                          {data.userAddress}
                        </div>
                      </div>
                      <div className="saleDetailsDiv_area_1_div1">
                        <div className="saleDetailsDiv_area_1_div1_title">
                          Seller's Country opf Residence
                        </div>
                        <div className="saleDetailsDiv_area_1_div1_body">
                          Nigeria
                        </div>
                      </div>
                    </div>
                    {/* ================ */}
                    {/* ================ */}
                    {/* ================ */}
                    {/* ================ */}
                    {/* ================ */}
                    {/* ================ */}
                    <div className="saleDetailsDiv_area_1">
                      <div className="saleDetailsDiv_area_1_title">
                        Bidding Action
                      </div>
                      {data.bidAmount != null ? (
                        <>
                          <div className="saleDetailsDiv_area_1_div1">
                            <div className="saleDetailsDiv_area_1_div1_title">
                              Bidding Status
                            </div>
                            <div className="saleDetailsDiv_area_1_div1_body">
                              {data.bidStatus}
                            </div>
                          </div>
                          <div className="saleDetailsDiv_area_1_div1">
                            <div className="saleDetailsDiv_area_1_div1_title">
                              Bidding Amount
                            </div>
                            <div className="saleDetailsDiv_area_1_div1_body">
                              {data.bidAmount}
                            </div>
                          </div>
                          <div className="acceptDeclineBidButtons">
                            <button
                              // onClick={handleAcceptBid}
                              onClick={() => {
                                handleAcceptBid(1);
                              }}
                              className="acceptDeclineBidButtons_accept"
                            >
                              Accept Bid
                            </button>
                            <button
                              onClick={() => {
                                handleAcceptBid(0);
                              }}
                              className="acceptDeclineBidButtons_decline"
                            >
                              Decline Bid
                            </button>
                          </div>
                        </>
                      ) : (
                        <div className="saleDetailsDiv_area_1_div1">
                          <div className="saleDetailsDiv_area_1_div1_title">
                            No bidding for this product yet
                          </div>
                        </div>
                      )}
                    </div>
                    {/* ================ */}
                    {/* ================ */}
                    {/* ================ */}
                    {/* ================ */}
                    {/* ================ */}
                    {/* ================ */}
                  </div>
                </div>
              ) : null}
            </>
          ))}
    </div>
  );
};

export default DashBoardUserSales;
