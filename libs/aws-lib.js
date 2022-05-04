import AWS from "aws-sdk";
import XRay from "aws-xray-sdk";

const AWSWrapped = process.env.IS_LOCAL ? AWS : XRay.captureAWS(AWS);

export default AWSWrapped;
