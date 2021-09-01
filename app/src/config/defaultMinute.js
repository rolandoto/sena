export const defaultMinute = `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Acta</title>
    </head>
    <body>
        <style>
            body {
                font-size: .6em
            }
            .divTable {
                display: table;
                width: 85%;
                margin: 0 auto;
            }
            .divRow {
                display: table-row;
                width: auto;
                clear: both;
            }
            .divCell {
                float: left; /* fix for  buggy browsers */
                border-top: 1px solid #929292;
                border-left: 1px solid #929292;
                border-right: 1px solid #929292;
                padding: 5px 0;
                overflow-wrap: break-word
            }
            .bNoRight {
                border-right: none !important;
            }
            .bBottom {
                border-bottom: 1px solid #929292;
            }
            .w100 {
                width: 98%;
            }
            .w70 {
                width: 62.5%;
            }
            .w50 {
                width: 48.94%;
            }
            .w15 {
                width: 17.6%;
            }
        </style>

        <div class="divTable">
            <div class="headRow">
                <div class="divCell w100" align="center">ACTA No.%{minute_number}</div>
            </div>
            <div class="divRow w100">
                <div class="divCell w100">
                    <strong>NOMBRE DEL COMITÉ O DE LA REUNION: </strong>
                    <span>%{minute_subject_name}</span>
                </div>
            </div>
            <div class="divRow">
                <div class="divCell w70 bNoRight" style="min-height: 40px;">
                    <strong>CIUDAD Y FECHA </strong>
                    <span>%{city_and_date}</span>
                </div>
                <div class="divCell w15 bNoRight" style="min-height: 40px;">
                    <strong>HORA INICIO </strong>
                    <span>%{start_date}</span>
                </div>
                <div class="divCell w15 " style="min-height: 40px;">
                    <strong>HORA FIN: </strong>
                    <span>%{end_date}</span>
                </div>
            </div>
            <div class="divRow">
                <div class="divCell w50 bNoRight" style="min-height: 40px;">
                    <strong>LUGAR: </strong>
                    <span>%{meeting_place}</span>
                </div>
                <div class="divCell w50" style="min-height: 40px;">
                    <strong>DIRECCIÓN: </strong>
                    <span>%{place_direction}</span>
                </div>
            </div>
           
            <div class="headRow">
                <div class="divCell w100">
                    <strong>TEMA(S): <br></strong>
                    <span>%{minute_subjects}</span>
                </div>
            </div>
            <div class="headRow">
                <div class="divCell w100">
                    <strong>OBJETIVO(S) DE LA REUNIÓN: </strong>
                    <span>%{meeting_objects}</span>
                </div>
            </div>
            <div class="headRow" align="center">
                <div class="divCell w100" >
                    <strong>DESARROLLO DE LA REUNION</strong>
                </div>
            </div>
            <div class="headRow">
                <div class="divCell w100" >
                    %{meeting_content}
                </div>
            </div>
            <div class="headRow" align="center">
                <div class="divCell w100" >
                    <strong>COMPROMISOS</strong>
                </div>
            </div>
            <div class="divRow">
                <div class="divCell w70 bNoRight" style="min-height: 30px;"></div>
                <div class="divCell w15 bNoRight" style="min-height: 30px;"><strong>RESPONSABLE</strong></div>
                <div class="divCell w15" style="min-height: 30px;"><strong>FECHA</strong></div>
            </div>
            <div class="divRow">
                <div class="divCell w70 bNoRight" style="min-height: 50px;">
                    %{compromises}
                </div>
                <div class="divCell w15 bNoRight" style="min-height: 50px;">
                    %{responsable}
                </div>
                <div class="divCell w15" style="min-height: 50px;">
                    %{compromise_date}
                </div>
            </div>
            <div class="headRow">
                <div class="divCell w100 bBottom" align="center">
                    <strong>ASISTENTES: (Incorporar registro de asistencia)</strong>
                </div>
            </div>
        </div>
    </body>
</html>
`;
