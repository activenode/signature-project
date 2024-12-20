import React, { forwardRef } from "react";
import { objectHasData } from "../utils/hasData";
import { SignatureData } from "../App";

const SignaturePreview = forwardRef<HTMLDivElement, { data: SignatureData }>(
  ({ data }, ref) => {
    // Calculate the actual width in pixels based on the max-width and percentage
    const logoWidth = data.logoWidth;
    const logoHeight = logoWidth / data.logoRatio;

    const baseTextColor = "#6b7280";
    const primaryLineColor = "black";
    const emailTextColor = "#2563eb";
    const baseTextSize = "17px";

    const hasTextData = objectHasData(data, ["logoWidth", "logoRatio"]);

    return (
      <div
        ref={ref}
        className="border rounded-md p-4 bg-white w-full max-w-md leading-tight"
        style={{
          fontSize: baseTextSize,
        }}
      >
        <div className="prose">
          <table
            cellPadding="0"
            cellSpacing="0"
            style={{ fontFamily: "Arial, sans-serif" }}
          >
            <tbody>
              <tr>
                {data.logo && (
                  <td
                    style={{
                      verticalAlign: "top",
                      paddingRight: "15px",
                    }}
                  >
                    {data.logo && (
                      <img
                        src={data.logo}
                        alt="Company logo"
                        width={Math.round(logoWidth)}
                        height={Math.round(logoHeight)}
                      />
                    )}
                  </td>)}
                <td style={{ verticalAlign: "top", color: baseTextColor }}>
                  {!hasTextData && (
                    <em className="opacity-50">
                      Edit the fields to see a preview
                    </em>
                  )}

                  {data.primaryLine && (
                    <div
                      style={{
                        fontSize: "1em",
                        fontWeight: "bold",
                        color: primaryLineColor,
                        marginBottom: "4px",
                      }}
                    >
                      {data.primaryLine}
                    </div>
                  )}
                  {data.optional && (
                    <div style={{ fontSize: "0.92em", marginBottom: "4px" }}>
                      {data.optional}
                    </div>
                  )}
                  {data.address && (
                    <div
                      style={{
                        fontSize: "0.92em",
                        marginBottom: "4px",
                        whiteSpace: "pre-line",
                      }}
                    >
                      {data.address}
                    </div>
                  )}

                  {(data.phone || data.email) && (
                    <>
                      {" "}
                      <hr style={{height: 0, marginTop: '1em', marginBottom: '1em'}} />

                      <div style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "4px",
                      }}>
                      {data.phone && (
                        <div
                          style={{ fontSize: "0.92em", marginBottom: "2px" }}
                        >
                          <span
                            style={{ fontSize: "0.8em", width: "44px" }}
                            className="inline-block relative opacity-75"
                          >
                            TEL: &nbsp; {' '}
                          </span>
                          {data.phone}
                        </div>
                      )}
                      {data.email && (
                        <div style={{ fontSize: "0.92em" }}>
                          <span
                            style={{ fontSize: "0.8em", width: "44px" }}
                            className="inline-block relative opacity-75"
                          >
                            MAIL: &nbsp; {' '}
                          </span>
                          <a
                            href={`mailto:${data.email}`}
                            style={{
                              color: emailTextColor,
                              textDecoration: "none",
                            }}
                          >
                            {data.email}
                          </a>
                        </div>
                      )}
                      </div>
                    </>
                  )}

                  <div style={{fontSize: '0.2em'}}>&nbsp;</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  },
);

SignaturePreview.displayName = "SignaturePreview";

export default SignaturePreview;
