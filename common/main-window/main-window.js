/**
 * Created by Stian on 12.02.2016.
 */

function StandardList(){
    var _this = this;
    _this.standards = [1,2,3,4];

    _this.setStandards = function(standards){
        console.log(standards);
        _this.standards = [4,3,2,1];
    };
    return _this;
}

(function(){
    var app = angular.module('mainApp', []);

    // Controller for selecting a theme.
    app.controller('TopicController', function($scope, $http){
        var editor = this;

        editor.topics = [];

        $http.get('http://37.139.13.117/v1/topics/').success(function(data){
            editor.topics = data;
        });

        $scope.getStandards = function(id) {
            $http.get('http://37.139.13.117/v1/topics/' + id).success(function(data){
                $scope.standards = data.documents;
            });
        }
    });


    // Controller for displaying standards/profiles
    app.controller('DisplayController', function($scope, $http) {


    });

    // Controller for displaying the content of a standard.
    app.controller('DisplayContentController', function($scope){
        $scope.getStdContent = function(standard){
            console.log(standard);
            var stdContentDisplay = $(".content-display");
            stdContentDisplay.empty();

            for (var i = 0; i < standard.fields.length; ++i){
                stdContentDisplay.append('<li>'+ standard.fields[i].fieldTitle +'</li>');
            }
        };
    });

    app.directive('loginpage', function(){
        return{
            restrict: 'E',
            templateUrl: 'common/login/login.html'
        };
    });

    app.directive('toolbar',function(){
        return{
            restrict: 'E',
            templateUrl: 'toolbar/toolbar-view.html'
        };
    });

    // Directive for html used to display the edtior.
    app.directive('editordisplay',function(){
        return{
            restrict: 'E',
            templateUrl: 'editor-display/editor-display-view.html'
        };
    });

    // Directive for html used to display the list of standards.
    app.directive('standarddisplay', function(){
        return{
            restrict: 'E',
            templateUrl: 'editor-display/standard-display/standard-display-view.html'
        };
    });

    // Directive for html used to display the content of standards/profiles.
    app.directive('contentdisplay', function(){
        return{
            restrict: 'E',
            templateUrl: 'editor-display/standard-content-display/standard-content-display-view.html'
        };
    });

    // Directive for html used to display the filebrowser.
    app.directive('filebrowser', function(){
        return{
            restrict: 'E',
            templateUrl: 'editor-display/file-browser/file-browser-view.html'
        };
    });


    var themes = [
        {
            
            themeId: 1,
            themeName: 'Del 1 - Informasjonssikkerhet',
            themeDescription: "Denne delen av Referansekatalogen for e-helse omfatter standarder og andre kravdokumenter som skal bidra til tilfredsstillende" +
                         " informasjonssikkerhet med hensyn til konfidensialitet, integritet, kvalitet og tilgjengelighet ved behandling av helseopplysninger.",
            extraInfo: [
                {
                    title: '',
                    content: 'Alle virksomheter som er tilknyttet Norsk helsenett er forpliktet til å følge Norm for informasjonssikkerhet Helse- og omsorgstjenesten (normen.no).'
                }
            ],
            subThemes: [
                {
                    themeId: 2,
                    themeName: 'Andre standarder',
                    standards: [
                        {
                            standardId: 1,
                            standardName: 'Sikkerhetskrav for systemer - Selvdeklarering​'
                        }
                    ]
                }
            ],
            standards: [
                {
                    standardId: 2,
                    standardName: 'Sikkerhetskrav for systemer - Selvdeklarering​',
                    fields: [
                        {
                            fieldID: '1',
                            fieldType: 'text',
                            fieldTitle: 'Titel',
                            fieldContent: 'Sikkerhetskrav for systemer - Selvdeklarering'
                        },
                        {
                            fieldID: '2',
                            fieldType: 'text',
                            fieldTitle: 'Referansekatalog ID',
                            fieldContent: '1.1'
                        },
                        {
                            fieldID: '3',
                            fieldType: 'text',
                            fieldTitle: 'Utgiver',
                            fieldContent: 'Styringsgruppen for Norm for informasjonssikkerhet'
                        },
                        {
                            fieldID: '4',
                            fieldType: 'text',
                            fieldTitle: 'Status',
                            fieldContent: 'Aktiv'
                        },
                        {
                            fieldID: '5',
                            fieldType: 'text',
                            fieldTitle: 'Versjon',
                            fieldContent: '4.1'
                        },
                        {
                            fieldID: '6',
                            fieldType: 'text',
                            fieldTitle: 'Publisert',
                            fieldContent: '17.8.2015'
                        }
                    ]
                }
            ]
        },
        {
            themeId: 3,
            themeName: 'Del 2 - Kodeverk, terminologier mv.',
            themeDescription: "Denne delen av Referansekatalogen for e-helse omfatter standarder og andre kravdokumenter som skal bidra til en ensartet bruk av termer og koder " +
                         "innen helse- og omsorgstjenesten.",
            extraInfo: [
                {
                    title: '',
                    content: "I tillegg til de klassifikasjoner mv. som det her stilles krav om, vil det også kunne inngå krav til bruk av bestemte kodeverk" +
                             " i standarder mv. som inngår i de øvrige delene av denne Referansekatalogen for e-helse."
                }
            ],
            subThemes: [
                {
                    themeId: 4,
                    themeName: 'Andre standarder',
                    standards: [
                        {
                            standardId: 3,
                            standardName: '​ICD-10: Den internasjonale statistiske klassifikasjonen av sykdommer og beslektede helseproblemer',
                            fields: [
                                {
                                    fieldID: '1',
                                    fieldType: 'text',
                                    fieldTitle: 'Titel',
                                    fieldContent: 'ICD-10: Den internasjonale statistiske klassifikasjonen av sykdommer og beslektede helseproblemer'
                                },
                                {
                                    fieldID: '2',
                                    fieldType: 'text',
                                    fieldTitle: 'Referansekatalog ID',
                                    fieldContent: '2.1'
                                },
                                {
                                    fieldID: '3',
                                    fieldType: 'text',
                                    fieldTitle: 'Utgiver',
                                    fieldContent: 'Helsedirektoratet / Verdens helseorganisasjon'
                                },
                                {
                                    fieldID: '4',
                                    fieldType: 'text',
                                    fieldTitle: 'Status',
                                    fieldContent: 'Aktiv'
                                },
                                {
                                    fieldID: '5',
                                    fieldType: 'text',
                                    fieldTitle: 'Versjon',
                                    fieldContent: ''
                                },
                                {
                                    fieldID: '6',
                                    fieldType: 'text',
                                    fieldTitle: 'Publisert',
                                    fieldContent: ''
                                }
                            ]
                        },
                        {
                            standardId: 4,
                            standardName: 'ICPC-2: Den internasjonale klassifikasjonen for primærhelsetjenesten',
                            fields: [
                                {
                                    fieldID: '1',
                                    fieldType: 'text',
                                    fieldTitle: 'Titel',
                                    fieldContent: 'ICPC-2: Den internasjonale klassifikasjonen for primærhelsetjenesten'
                                },
                                {
                                    fieldID: '2',
                                    fieldType: 'text',
                                    fieldTitle: 'Referansekatalog ID',
                                    fieldContent: '3.1'
                                },
                                {
                                    fieldID: '3',
                                    fieldType: 'text',
                                    fieldTitle: 'Utgiver',
                                    fieldContent: 'Helsedirektoratet, NSAM og Wonca'
                                },
                                {
                                    fieldID: '4',
                                    fieldType: 'text',
                                    fieldTitle: 'Status',
                                    fieldContent: 'Aktiv'
                                },
                                {
                                    fieldID: '5',
                                    fieldType: 'text',
                                    fieldTitle: 'Versjon',
                                    fieldContent: ''
                                },
                                {
                                    fieldID: '6',
                                    fieldType: 'text',
                                    fieldTitle: 'Publisert',
                                    fieldContent: ''
                                }
                            ]

                        },
                        {
                            standardId: 5,
                            standardName: '​NCMP: Kodeverk for medisinske prosedyrer',
                            fields: [
                                {
                                    fieldID: '1',
                                    fieldType: 'text',
                                    fieldTitle: 'Titel',
                                    fieldContent: 'NCMP: Kodeverk for medisinske prosedyrer'
                                },
                                {
                                    fieldID: '2',
                                    fieldType: 'text',
                                    fieldTitle: 'Referansekatalog ID',
                                    fieldContent: '4.1'
                                },
                                {
                                    fieldID: '3',
                                    fieldType: 'text',
                                    fieldTitle: 'Utgiver',
                                    fieldContent: 'Helsedirektoratet'
                                },
                                {
                                    fieldID: '4',
                                    fieldType: 'text',
                                    fieldTitle: 'Status',
                                    fieldContent: 'Aktiv'
                                },
                                {
                                    fieldID: '5',
                                    fieldType: 'text',
                                    fieldTitle: 'Versjon',
                                    fieldContent: ''
                                },
                                {
                                    fieldID: '6',
                                    fieldType: 'text',
                                    fieldTitle: 'Publisert',
                                    fieldContent: ''
                                }
                            ]
                        },
                        {
                            standardId: 6,
                            standardName: '​NCSP: Kodeverk for kirurgiske prosedyrer',
                            fields: [
                                {
                                    fieldID: '1',
                                    fieldType: 'text',
                                    fieldTitle: 'Titel',
                                    fieldContent: 'NCMP: Kodeverk for medisinske prosedyrer'
                                },
                                {
                                    fieldID: '2',
                                    fieldType: 'text',
                                    fieldTitle: 'Referansekatalog ID',
                                    fieldContent: '5.1'
                                },
                                {
                                    fieldID: '3',
                                    fieldType: 'text',
                                    fieldTitle: 'Utgiver',
                                    fieldContent: 'Helsedirektoratet'
                                },
                                {
                                    fieldID: '4',
                                    fieldType: 'text',
                                    fieldTitle: 'Status',
                                    fieldContent: 'Aktiv'
                                },
                                {
                                    fieldID: '5',
                                    fieldType: 'text',
                                    fieldTitle: 'Versjon',
                                    fieldContent: ''
                                },
                                {
                                    fieldID: '6',
                                    fieldType: 'text',
                                    fieldTitle: 'Publisert',
                                    fieldContent: ''
                                }
                            ]
                        },
                        {
                            standardId: 7,
                            standardName: 'NCRP: Norsk klassifikasjon av radiologiske prosedyrer',
                            fields: [
                                {
                                    fieldID: '1',
                                    fieldType: 'text',
                                    fieldTitle: 'Titel',
                                    fieldContent: 'NCRP: Norsk klassifikasjon av radiologiske prosedyrer'
                                },
                                {
                                    fieldID: '2',
                                    fieldType: 'text',
                                    fieldTitle: 'Referansekatalog ID',
                                    fieldContent: '6.1'
                                },
                                {
                                    fieldID: '3',
                                    fieldType: 'text',
                                    fieldTitle: 'Utgiver',
                                    fieldContent: 'Helsedirektoratet'
                                },
                                {
                                    fieldID: '4',
                                    fieldType: 'text',
                                    fieldTitle: 'Status',
                                    fieldContent: 'Aktiv'
                                },
                                {
                                    fieldID: '5',
                                    fieldType: 'text',
                                    fieldTitle: 'Versjon',
                                    fieldContent: ''
                                },
                                {
                                    fieldID: '6',
                                    fieldType: 'text',
                                    fieldTitle: 'Publisert',
                                    fieldContent: ''
                                }
                            ]
                        },
                        {
                            standardId: 8,
                            standardName: '​ICD-10: Psykiske lidelser og atferdsforstyrrelse: kliniske beskrivelser og diagnostiske retningslinjer (Blåboka)',
                            fields: [
                                {
                                    fieldID: '1',
                                    fieldType: 'text',
                                    fieldTitle: 'Titel',
                                    fieldContent: '​ICD-10: Psykiske lidelser og atferdsforstyrrelse: kliniske beskrivelser og diagnostiske retningslinjer (Blåboka)'
                                },
                                {
                                    fieldID: '2',
                                    fieldType: 'text',
                                    fieldTitle: 'Referansekatalog ID',
                                    fieldContent: '7.1'
                                },
                                {
                                    fieldID: '3',
                                    fieldType: 'text',
                                    fieldTitle: 'Utgiver',
                                    fieldContent: 'Helsedirektoratet / Verdens helseorganisasjon'
                                },
                                {
                                    fieldID: '4',
                                    fieldType: 'text',
                                    fieldTitle: 'Status',
                                    fieldContent: 'Aktiv'
                                },
                                {
                                    fieldID: '5',
                                    fieldType: 'text',
                                    fieldTitle: 'Versjon',
                                    fieldContent: ''
                                },
                                {
                                    fieldID: '6',
                                    fieldType: 'text',
                                    fieldTitle: 'Publisert',
                                    fieldContent: ''
                                }
                            ]
                        },
                        {
                            standardId: 9,
                            standardName: 'Den norske SNOMED​',
                            fields: [
                                {
                                    fieldID: '1',
                                    fieldType: 'text',
                                    fieldTitle: 'Titel',
                                    fieldContent: 'Den norske SNOMED​'
                                },
                                {
                                    fieldID: '2',
                                    fieldType: 'text',
                                    fieldTitle: 'Referansekatalog ID',
                                    fieldContent: '8.1'
                                },
                                {
                                    fieldID: '3',
                                    fieldType: 'text',
                                    fieldTitle: 'Utgiver',
                                    fieldContent: 'Den norske patologforening'
                                },
                                {
                                    fieldID: '4',
                                    fieldType: 'text',
                                    fieldTitle: 'Status',
                                    fieldContent: 'Aktiv'
                                },
                                {
                                    fieldID: '5',
                                    fieldType: 'text',
                                    fieldTitle: 'Versjon',
                                    fieldContent: ''
                                },
                                {
                                    fieldID: '6',
                                    fieldType: 'text',
                                    fieldTitle: 'Publisert',
                                    fieldContent: ''
                                }
                            ]
                        },
                        {
                            standardId: 10,
                            standardName: '​ATC: Anatomisk Terapeutisk Kjemisk legemiddelregister',
                            fields: [
                                {
                                    fieldID: '1',
                                    fieldType: 'text',
                                    fieldTitle: 'Titel',
                                    fieldContent: '​ATC: Anatomisk Terapeutisk Kjemisk legemiddelregister​'
                                },
                                {
                                    fieldID: '2',
                                    fieldType: 'text',
                                    fieldTitle: 'Referansekatalog ID',
                                    fieldContent: '9.1'
                                },
                                {
                                    fieldID: '3',
                                    fieldType: 'text',
                                    fieldTitle: 'Utgiver',
                                    fieldContent: 'WHO Collaborating Centre for Drug Statistics Methodology (under Folkehelseinstituttet)'
                                },
                                {
                                    fieldID: '4',
                                    fieldType: 'text',
                                    fieldTitle: 'Status',
                                    fieldContent: 'Aktiv'
                                },
                                {
                                    fieldID: '5',
                                    fieldType: 'text',
                                    fieldTitle: 'Versjon',
                                    fieldContent: ''
                                },
                                {
                                    fieldID: '6',
                                    fieldType: 'text',
                                    fieldTitle: 'Publisert',
                                    fieldContent: ''
                                }
                            ]
                        },
                        {
                            standardId: 11,
                            standardName: 'Multiaksial klassifikasjon i psykisk helsevern for barn og unge (BUP)',
                            fields: [
                                {
                                    fieldID: '1',
                                    fieldType: 'text',
                                    fieldTitle: 'Titel',
                                    fieldContent: 'Multiaksial klassifikasjon i psykisk helsevern for barn og unge (BUP)​'
                                },
                                {
                                    fieldID: '2',
                                    fieldType: 'text',
                                    fieldTitle: 'Referansekatalog ID',
                                    fieldContent: '10.1'
                                },
                                {
                                    fieldID: '3',
                                    fieldType: 'text',
                                    fieldTitle: 'Utgiver',
                                    fieldContent: 'Helsedirektoratet'
                                },
                                {
                                    fieldID: '4',
                                    fieldType: 'text',
                                    fieldTitle: 'Status',
                                    fieldContent: 'Aktiv'
                                },
                                {
                                    fieldID: '5',
                                    fieldType: 'text',
                                    fieldTitle: 'Versjon',
                                    fieldContent: ''
                                },
                                {
                                    fieldID: '6',
                                    fieldType: 'text',
                                    fieldTitle: 'Publisert',
                                    fieldContent: ''
                                }
                            ]
                        },
                        {
                            standardId: 12,
                            standardName: '​Norsk laboratoriekodeverk (NLK)',
                            fields: [
                                {
                                    fieldID: '1',
                                    fieldType: 'text',
                                    fieldTitle: 'Titel',
                                    fieldContent: 'Norsk laboratoriekodeverk (NLK)'
                                },
                                {
                                    fieldID: '2',
                                    fieldType: 'text',
                                    fieldTitle: 'Referansekatalog ID',
                                    fieldContent: '11.1'
                                },
                                {
                                    fieldID: '3',
                                    fieldType: 'text',
                                    fieldTitle: 'Utgiver',
                                    fieldContent: 'Helsedirektoratet'
                                },
                                {
                                    fieldID: '4',
                                    fieldType: 'text',
                                    fieldTitle: 'Status',
                                    fieldContent: 'Aktiv'
                                },
                                {
                                    fieldID: '5',
                                    fieldType: 'text',
                                    fieldTitle: 'Versjon',
                                    fieldContent: ''
                                },
                                {
                                    fieldID: '6',
                                    fieldType: 'text',
                                    fieldTitle: 'Publisert',
                                    fieldContent: ''
                                }
                            ]
                        }
                    ]
                }
            ],
            standards: [
                {
                    standardId: 13,
                    standardName: '​ICD-10: Den internasjonale statistiske klassifikasjonen av sykdommer og beslektede helseproblemer',
                    fields: [
                        {
                            fieldID: '1',
                            fieldType: 'text',
                            fieldTitle: 'Titel',
                            fieldContent: '​ICD-10: Den internasjonale statistiske klassifikasjonen av sykdommer og beslektede helseproblemer'
                        },
                        {
                            fieldID: '2',
                            fieldType: 'text',
                            fieldTitle: 'Referansekatalog ID',
                            fieldContent: '12.2'
                        },
                        {
                            fieldID: '3',
                            fieldType: 'text',
                            fieldTitle: 'Utgiver',
                            fieldContent: 'Helsedirektoratet / Verdens helseorganisasjon'
                        },
                        {
                            fieldID: '4',
                            fieldType: 'text',
                            fieldTitle: 'Status',
                            fieldContent: 'Aktiv'
                        },
                        {
                            fieldID: '5',
                            fieldType: 'text',
                            fieldTitle: 'Versjon',
                            fieldContent: ''
                        },
                        {
                            fieldID: '6',
                            fieldType: 'text',
                            fieldTitle: 'Publisert',
                            fieldContent: ''
                        }
                    ]
                },
                {
                    standardId: 15,
                    standardName: 'ICPC-2: Den internasjonale klassifikasjonen for primærhelsetjenesten'
                },
                {
                    standardId: 16,
                    standardName: '​NCMP: Kodeverk for medisinske prosedyrer'
                },
                {
                    standardId: 17,
                    standardName: '​NCSP: Kodeverk for kirurgiske prosedyrer'
                },
                {
                    standardId: 18,
                    standardName: 'NCRP: Norsk klassifikasjon av radiologiske prosedyrer'
                },
                {
                    standardId: 19,
                    standardName: '​ICD-10: Psykiske lidelser og atferdsforstyrrelse: kliniske beskrivelser og diagnostiske retningslinjer (Blåboka)'
                },
                {
                    standardId: 20,
                    standardName: 'Den norske SNOMED​'
                },
                {
                    standardId: 21,
                    standardName: '​ATC: Anatomisk Terapeutisk Kjemisk legemiddelregister'
                },
                {
                    standardId: 22,
                    standardName: 'Multiaksial klassifikasjon i psykisk helsevern for barn og unge (BUP)'
                },
                {
                    standardId: 23,
                    standardName: '​Norsk laboratoriekodeverk (NLK)'
                }
            ]
        },
        {
            themeId: 5,
            themeName: 'Del 3: Informasjonsinnhold og strukturert føring av journal',
            themeDescription: 'Omfatter standarder og andre kravdokumenter som skal bidra til at elektroniske pasientjournaler føres på en ensartet måte i alle' +
                         ' virksomheter. ​​​​​​​​​​​​​​​​​​​​​​​​I tillegg skal det sørges for at innholdet blir strukturert på en slik måte at opplysningene blir egnet for gjenbruk til ' +
                         'forskjellige formål.',
            extraInfo: [
                {
                    title: 'Strukturering av journal',
                    content: 'For helsepersonell kan det være problematisk å finne fram i en dårlig strukturert elektronisk ' +
                             'pasientjournal, og det er også vanskelig å oppnå den nødvendige presisjon i styringen av tilgang til opplysningene dersom strukturen er mangelfull. ' +
                             'For at helsepersonell skal kunne yte forsvarlig helsehjelp, må de autoriseres for tilgang til nødvendige og relevante helseopplysninger. Dette ' +
                             'forutsetter at helseopplysningene er delt inn i informasjonskategorier (grupper) som er egnet for styring av tilgang. Ved det enkelte tilfelle av ' +
                             'tilgang må det kunne foretas ytterligere filtrering.  For en kategori kan det for eksempel kun gis tilgang til opplysninger registrert i forbindelse ' +
                             'med pågående behandling, dersom dette er tilstrekkelig i den aktuelle situasjonen. For å kunne foreta mer avanserte former for behandling av opplysninger, ' +
                             'eksempelvis i forbindelse med beslutningsstøtte, elektronisk samhandling og melding til forskjellige helseregistre, kreves en ytterligere detaljering av strukturen.' +
                             ' Kravene til slik strukturering beskrives gjennom innholdsstandarder hvor det inngår entydige spesifikasjoner av hvert enkelt informasjonselement, samt organiseringen av disse. '
                }
            ],
            subThemes: [
                {
                    themeId: 6,
                    themeName: 'Grunnleggende krav til EPJ-systemer',
                    standards: [
                        {
                            standardId: 24,
                            standardName: 'EPJ Standard del 2 - Tilgangsstyring, redigering, retting og sletting (HIS 80506)​​'
                        },
                        {
                            standardId: 25,
                            standardName: 'EPJ Standard del 3 - Journalarkitektur og generelt om journalinnhold (HIS 80507)​​'
                        },
                        {
                            standardId: 26,
                            standardName: 'EPJ Standard del 4 - Person, organisasjon mv (HIS 80508) ​​'
                        },
                        {
                            standardId: 27,
                            standardName: 'EPJ Standard del 5 - Arkivuttrekk (HIS 80509)​​'
                        },
                        {
                            standardId: 28,
                            standardName: 'EPJ Standard del 6 - Felles funksjonelle krav (HIS 80510)​​'
                        }
                    ]
                },
                {
                    themeId: 7,
                    themeName: 'Innhold og funksjonalitet i EPJ-systemer',
                    standards: [
                        {
                            standardId: 29,
                            standardName: 'Kravspesifikasjon elektronisk dokumentasjonssystem for pleie- og omsorgstjenesten (HIS 80315)​​​'
                        },
                        {
                            standardId: 30,
                            standardName: 'Teknisk standard for elektronisk dokumentasjonssystem for pleie- og omsorgstjenesten (HIS 80318) ​'
                        },
                        {
                            standardId: 31,
                            standardName: 'Vedtak etter psykisk helsevernloven (HIS 80702)'
                        },
                        {
                            standardId: 32,
                            standardName: 'Vedtak etter psykisk helsevernloven (HIS 80702)'
                        },
                        {
                            standardId: 33,
                            standardName: 'Kravspesifikasjon for EPJ i helsestasjons- og skolehelsetjenesten (HIS 1104-1)​'
                        },
                        {
                            standardId: 34,
                            standardName: 'Kravspesifikasjon for EPJ i helsestasjons- og skolehelsetjenesten - Del II Tekniske krav til informasjonsinnhold (HIS 1104-2)'
                        }
                    ]
                }
            ],
            standards: [
                {
                    standardId: 35,
                    standardName: 'EPJ Standard del 2 - Tilgangsstyring, redigering, retting og sletting (HIS 80506)​​'
                },
                {
                    standardId: 36,
                    standardName: 'EPJ Standard del 3 - Journalarkitektur og generelt om journalinnhold (HIS 80507)​​'
                },
                {
                    standardId: 37,
                    standardName: 'EPJ Standard del 4 - Person, organisasjon mv (HIS 80508) ​​'
                },
                {
                    standardId: 38,
                    standardName: 'EPJ Standard del 5 - Arkivuttrekk (HIS 80509)​​'
                },
                {
                    standardId: 39,
                    standardName: 'EPJ Standard del 6 - Felles funksjonelle krav (HIS 80510)​​'
                }
            ]
        },
        {
            themeId: 8,
            themeName: 'Del 4 - Elektronisk samhandling',
            themeDescription: 'Omfatter standarder og andre kravdokumenter som skal bidra til sikker elektronisk utveksling av helseopplysninger mellom ulike virksomheter i helse- og omsorgstjenesten.',
            extraInfo: [
                {
                    title: '',
                    content: '​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​Det vil framgå av den enkelte standard eller profil hvilke metoder som skal kunne benyttes ved samhandlingen. ' +
                             'For kravdokument som omhandler elektroniske meldinger, vil det både være angitt målgruppe for sending av meldingen og målgruppe for mottak av meldingen.'
                }
            ],
            subThemes: [
                {
                    themeId: 9,
                    themeName: 'Grunnleggende krav til elektronisk samhandling',
                    standards: [
                        {
                            standardId: 40,
                            standardName: 'ebXML Messages Service specification​​​'
                        },
                        {
                            standardId: 41,
                            standardName: 'ebXML Rammeverk (HIS 1037)'
                        },
                        {
                            standardId: 42,
                            standardName: 'Applikasjonskvittering v1.1 (HIS 80415:2012)​'
                        },
                        {
                            standardId: 43,
                            standardName: 'Applikasjonskvittering v1.0 (HIS 80415:2004)​'
                        },
                        {
                            standardId: 44,
                            standardName: 'Dialogmelding (HIS 80603)​​​​'
                        },
                        {
                            standardId: 45,
                            standardName: 'Avviksmelding (HIS 1151)​​'
                        },
                        {
                            standardId: 46,
                            standardName: '​Krav til tjenestebasert adressering (HIS 1153)'
                        }
                    ]
                },
                {
                    themeId: 10,
                    themeName: 'Henvisning og epikrise',
                    standards: [
                        {
                            standardId: 47,
                            standardName: 'Henvisningsmelding (HIS 80517)​​'
                        },
                        {
                            standardId: 48,
                            standardName: 'Henvisningsmelding - tannhelsetjenesten (HIS 1017)​'
                        },
                        {
                            standardId: 49,
                            standardName: 'Epikrisemelding (HIS 80226)​​'
                        },
                        {
                            standardId: 50,
                            standardName: 'Epikrisemelding - tannhelsetjenesten (HIS 1016)​'
                        }
                    ]
                },
                {
                    themeId: 11,
                    themeName: 'Samhandling – laboratoriemedisin og radiologi​​',
                    standards: [
                        {
                            standardId: 51,
                            standardName: '​Rekvisisjon - laboratoriemedisin (HIS 1160)'
                        },
                        {
                            standardId: 52,
                            standardName: '​Svarrapportering av medisinske tjenester (HIS 80822)'
                        },
                        {
                            standardId: 53,
                            standardName: '​Svarrapport - medisinsk biokjemi (HIS 1138)'
                        },
                        {
                            standardId: 54,
                            standardName: 'Svarrapport - mikrobiologi (HIS 1139)​​'
                        },
                        {
                            standardId: 55,
                            standardName: 'Svarrapport - immunologi (HIS 1140)​'
                        },
                        {
                            standardId: 56,
                            standardName: '​Svarrapport - patologi (HIS 1141)​'
                        },
                        {
                            standardId: 57,
                            standardName: '​Rekvisisjon/henvising - radiologi (HIS 80821)'
                        },
                        {
                            standardId: 58,
                            standardName: 'Svarrapport - radiologi (HIS 1142)​​'
                        }
                    ]
                },
                {
                    themeId: 12,
                    themeName: 'Pleie- og omsorgsmeldinger',
                    standards: [
                        {
                            standardId: 59,standardName: 'Standard for elektronisk kommunikasjon med pleie- og omsorgstjenesten​ (HIS 80704)​​'
                        },
                        {
                            standardId: 60,standardName: '​Innleggelsesrapport (HIS 1143)'
                        },
                        {
                            standardId: 61,standardName: 'Helseopplysninger (HIS 1144)​'
                        },
                        {
                            standardId: 62,standardName: 'Helseopplysninger til lege (HIS 1145)​'
                        },
                        {
                            standardId: 63,standardName: '​Orientering om tjenestetilbud (HIS 1146)'
                        },
                        {
                            standardId: 64,standardName: '​Medisinske opplysninger (HIS 1147)'
                        },
                        {
                            standardId: 65,standardName: 'Utskrivningsrapport (HIS 1148)'
                        },
                        {
                            standardId: 66,standardName: 'Pasientlogistikkmeldinger (HIS 1149)​'
                        },
                        {
                            standardId: 67,standardName: '​Standard for kommunikasjon av EPJ-innhold (HIS 80710)'
                        },
                        {
                            standardId: 68,standardName: 'Overføring av legemiddelopplysninger (HIS 1150)'
                        },
                        {
                            standardId: 69,standardName: '​​​Forespørsel og svar på forespørsel i tilknytning til pleie- og omsorgsmeldinger (HIS 1152)'
                        }
                    ]
                },
                {
                    themeId: 13,
                    themeName: 'E-resept',
                    standards: [
                        {
                            standardId: 70,
                            standardName: 'M1 Resept (HIS 80809)​​'
                        },
                        {
                            standardId: 71,
                            standardName: 'M02 Individuell søknad om refusjon til HELFO (HIS 80810)​​'
                        },
                        {
                            standardId: 72,
                            standardName: 'M3 Anmodning om søknad til SLV (HIS 80811)​​​'
                        },
                        {
                            standardId: 73,
                            standardName: 'M04.1-2 Referansenummer (HIS 80819)​​'
                        },
                        {
                            standardId: 74,
                            standardName: 'M5 - Tilbakekalling (HIS 80812)​​'
                        },
                        {
                            standardId: 75,
                            standardName: 'M6 Utleveringsrapport forskriver (HIS 80813)​​'
                        },
                        {
                            standardId: 76,
                            standardName: 'M7 Slettet resept (HIS 80812)​​'
                        },
                        {
                            standardId: 77,
                            standardName: 'M8 Utleveringsrapport fastlege (HIS 80813)​​'
                        },
                        {
                            standardId: 78,
                            standardName: 'M09.1 Forespørsel om tilgjengelige resepter på pasient (HIS 80814) ​'
                        },
                        {
                            standardId: 79,
                            standardName: '​M09.2 Reseptliste (utleverer) (HIS 80814) ​'
                        },
                        {
                            standardId: 80,
                            standardName: '​M09.3 Forespørsel om nedlasting av resept (HIS 80814) ​'
                        },
                        {
                            standardId: 81,
                            standardName: 'M09.4 Nedlasting av resept (HIS 80814) ​​'
                        },
                        {
                            standardId: 82,
                            standardName: 'M9.5 – Forespørsel om tilgjengelige resepter på pasient (HIS 80812)'
                        },
                        {
                            standardId: 83,
                            standardName: 'M9.6 – Reseptliste (rekvirent) (HIS 80812) ​'
                        },
                        {
                            standardId: 84,
                            standardName: 'M09.7 - Forespørsel om utleveringer på resept (HIS 80812)'
                        },
                        {
                            standardId: 85,
                            standardName: 'M9.8 - Utleveringer på resept (HIS 80812)​'
                        },
                        {
                            standardId: 86,
                            standardName: 'M9.11 Forespørsel om varer i bruk (HIS 80816) ​​'
                        },
                        {
                            standardId: 87,
                            standardName: 'M9.12 Nedlasting av varer i bruk (HIS 80816) ​​'
                        },
                        {
                            standardId: 88,
                            standardName: 'M9.21 Hent endrede multidosepasienter (HIS 80816) ​​'
                        },
                        {
                            standardId: 89,
                            standardName: 'M9.22 Endrede multidosepasienter (HIS 80816)​​​'
                        },
                        {
                            standardId: 90,
                            standardName: 'M10 Utleveringsrapport reseptformidler (HIS 80813) ​​'
                        },
                        {
                            standardId: 91,
                            standardName: 'M12 Søknadssvar – Individuell søknad om refusjon til HELFO (HIS 80810)​'
                        },
                        {
                            standardId: 92,
                            standardName: '​M14 Søknad til SLV (HIS 80811) ​'
                        },
                        {
                            standardId: 93,
                            standardName: '​M15 Søknadssvar fra SLV (HIS 80811) ​'
                        },
                        {
                            standardId: 94,
                            standardName: '​M18 Oppgjørskrav (HIS 80815)'
                        },
                        {
                            standardId: 95,
                            standardName: 'M20 Notifisering (HIS 80813) ​​'
                        },
                        {
                            standardId: 96,
                            standardName: 'M21 Ekspederingsanmodning (HIS 80809) ​​'
                        },
                        {
                            standardId: 97,
                            standardName: 'M22 Oppgjørsresultat (HIS 80815) ​​'
                        },
                        {
                            standardId: 98,
                            standardName: 'M23 Utbetaling (HIS 80815) ​​'
                        },
                        {
                            standardId: 99,
                            standardName: 'M24.1 Samtykke (HIS 80812)​'
                        },
                        {
                            standardId: 100,
                            standardName: 'M24.2 Svar på samtykke (HIS 80812) ​​'
                        },
                        {
                            standardId: 101,
                            standardName: 'M25.1 Legemidler i bruk (HIS 80816)​​'
                        },
                        {
                            standardId: 102,
                            standardName: 'M25.2 Legemidler i bruk - forespørsel om endring (HIS 80816) ​'
                        },
                        {
                            standardId: 103,
                            standardName: '​M25.3 Legemidler i bruk - utleveringsmelding (HIS 80816) ​'
                        },
                        {
                            standardId: 104,
                            standardName: '​M27.1 Registrering av multidoseansvarlig (HIS 80816) ​'
                        },
                        {
                            standardId: 105,
                            standardName: '​M27.2 Svar på registrering av multidoseansvarlig (HIS 80816) ​'
                        },
                        {
                            standardId: 106,
                            standardName: 'M28 Endring av multidoselege (HIS 80816)  '
                        },
                        {
                            standardId: 107,
                            standardName: '​M30 FEST-meldingen (HIS 80818) ​'
                        }
                    ]
                },
                {
                    themeId: 14,
                    themeName: 'Samhandling med NAV',
                    standards: [
                        {
                            standardId: 108,
                            standardName: 'Legeerklæring ved arbeidsuførhet (HIS 80805:2008)'
                        },
                        {
                            standardId: 109,
                            standardName: 'Medisinsk vurdering av arbeidsmulighet / Sykmelding (HIS 80803) ​​'
                        },
                        {
                            standardId: 110,
                            standardName: '​Innkalling dialogmøte'
                        },
                        {
                            standardId: 111,
                            standardName: 'Svar innkalling dialogmøte​'
                        },
                        {
                            standardId: 112,
                            standardName: 'Forespørsel om pasient'
                        },
                        {
                            standardId: 113,
                            standardName: '​Svar på forespørsel om pasient'
                        },
                        {
                            standardId: 114,
                            standardName: 'Oppfølgingsplan fra arbeidsgiver​'
                        },
                        {
                            standardId: 115,
                            standardName: 'Henvendelse fra NAV til lege'
                        },
                        {
                            standardId: 116,
                            standardName: 'Henvendelse fra lege til NAV​'
                        }
                    ]
                },
                {
                    themeId: 15,
                    themeName: 'Samhandling med HELFO',
                    standards: [
                        {
                            standardId: 117,
                            standardName: 'Behandlerkravmelding (BKM)'
                        },
                        {
                            standardId: 118,
                            standardName: '​NPR-behandlerkravmelding (NPR-BKM)​'
                        },
                        {
                            standardId: 119,
                            standardName: '​Forespørsel og svar om egenandel (​HIS 1024)​'
                        },
                        {
                            standardId: 120,
                            standardName: 'Pasientens fastlege (​HIS 1022)​'
                        },
                        {
                            standardId: 121,
                            standardName: '​Fastlegeliste: Oversikt over fastlegens listeinnbyggere (​HIS 1023)​'
                        }
                    ]
                },
                {
                    themeId: 16,
                    themeName: 'Melding til Norsk pasientregister',
                    standards: [
                        {
                            standardId: 122,
                            standardName: 'Ordinær NPR-melding v52.0.2​'
                        },
                        {
                            standardId: 123,
                            standardName: 'Innrapportering av data for identifikasjon av person v52.0.2​'
                        },
                        {
                            standardId: 124,
                            standardName: 'Validering av data om helsehjelp for somatiske lidelser v52.0.2​'
                        },
                        {
                            standardId: 125,
                            standardName: '​Innrapportering av data etter psykisk helsevernloven (EPJ-standard) v52.0.2'
                        },
                        {
                            standardId: 126,
                            standardName: 'Innrapportering av data fra Psykisk helsevern voksne (PHV) v52.0.2​'
                        },
                        {
                            standardId: 127,
                            standardName: '​Innrapportering av data fra Barne og ungdomspsykiatrien (BUP) v52.0.2​'
                        },
                        {
                            standardId: 128,
                            standardName: 'Innrapportering av data om ventelister v52.0.2'
                        },
                        {
                            standardId: 129,
                            standardName: '​Innrapportering av data fra tverrfaglig spesialisert rusbehandling (TSB) aktivitetsdata v52.0.2'
                        },
                        {
                            standardId: 130,
                            standardName: '​Innrapportering av data fra avtalespesialister v52.0.2'
                        },
                        {
                            standardId: 131,
                            standardName: '​Innrapportering av data fra rehabiliteringsenheter v52.0.2​'
                        },
                        {
                            standardId: 132,
                            standardName: '​Innrapportering av data fra billeddiagnostikk, intervensjon og nukleærmedisin v52.0.2'
                        },
                        {
                            standardId: 133,
                            standardName: 'Innrapportering av data fra Innsatsstyrt finansiering (ISF) v52.0.2'
                        },
                        {
                            standardId: 134,
                            standardName: '​Innrapportering av data om situasjonen ved behandlingsstart for ruspasienter v52.0.2​'
                        },
                        {
                            standardId: 135,
                            standardName: 'Innrapportering av data fra prehospitale tjenester/ambulanse v52.0.2​'
                        },
                        {
                            standardId: 136,
                            standardName: '​Innrapportering av data om personskade. Felles minimum datasett (FMDS) v52.0.2​'
                        },
                        {
                            standardId: 137,
                            standardName: 'Innrapportering av data om arbeidsrelatert skade. Skadetypespesfikt minimum datasett (SMDS) v52.0.2​.'
                        },
                        {
                            standardId: 138,
                            standardName: '​Innrapportering av data om veitrafikkskade. Skadetypespesifikt minimum datasett (SMDS) v52.0.2'
                        },
                        {
                            standardId: 139,
                            standardName: '​​Innrapportering av data om produktrelatert skade. Skadetypespesifikt minimum datasett (SMDS) v52.0.2'
                        },
                        {
                            standardId: 140,
                            standardName: '​Innrapportering av data fra stråleterapi v52.0.2'
                        },
                        {
                            standardId: 141,
                            standardName: '​Den ordinære tilbakemeldingen inkludert feilmeldinger v52.0.2​'
                        }
                    ]
                },
                {
                    themeId: 17,
                    themeName: 'Melding til øvrige sentrale helseregistre ',
                    standards: [
                        {
                            standardId: 142,
                            standardName: 'Melding til SYSVAK: HendelseRequest​​'
                        },
                        {
                            standardId: 143,
                            standardName: 'Melding til SYSVAK: SokRequest​​'
                        },
                        {
                            standardId: 144,
                            standardName: 'Melding til SYSVAK: KodeverkRequest​​'
                        },
                        {
                            standardId: 145,
                            standardName: 'Svarmelding fra SYSVAK: HendelseResponse​​'
                        },
                        {
                            standardId: 146,
                            standardName: '​Svarmelding fra Sysvak: SokResponse​'
                        },
                        {
                            standardId: 147,
                            standardName: '​Svarmelding fra SYSVAK: KodeverkResponse​'
                        },
                        {
                            standardId: 148,
                            standardName: 'Melding av fødsel til Medisinsk fødselsregister (MFR)​'
                        },
                        {
                            standardId: 149,
                            standardName: 'Melding om fødte overflyttet nyfødtavdeling'
                        },
                        {
                            standardId: 150,
                            standardName: 'Melding om svangerskapsavbrudd'
                        }
                    ]
                },
                {
                    themeId: 18,
                    themeName: 'Melding til IPLOS',
                    standards: [
                        {
                            standardId: 151,
                            standardName: 'IPLOS Teknisk kravspesifikasjon​'
                        },
                        {
                            standardId: 152,
                            standardName: '​IPLOS Funksjonell kravspesifikasjon'
                        }
                    ]
                }
            ],
            standards: [
                {
                    standardId: 153
                    ,standardName: 'M1 Resept (HIS 80809)​​'
                },
                {
                    standardId: 154,
                    standardName: 'M02 Individuell søknad om refusjon til HELFO (HIS 80810)​​'
                },
                {
                    standardId: 155,
                    standardName: 'M3 Anmodning om søknad til SLV (HIS 80811)​​​'
                },
                {
                    standardId: 156,
                    standardName: 'M04.1-2 Referansenummer (HIS 80819)​​'
                },
                {
                    standardId: 157,
                    standardName: 'M5 - Tilbakekalling (HIS 80812)​​'
                },
                {
                    standardId: 158,
                    standardName: 'M6 Utleveringsrapport forskriver (HIS 80813)​​'
                },
                {
                    standardId: 159,
                    standardName: 'M7 Slettet resept (HIS 80812)​​'
                },
                {
                    standardId: 160,
                    standardName: 'M8 Utleveringsrapport fastlege (HIS 80813)​​'
                },
                {
                    standardId: 161,
                    standardName: 'M09.1 Forespørsel om tilgjengelige resepter på pasient (HIS 80814) ​'
                },
                {
                    standardId: 162,
                    standardName: '​M09.2 Reseptliste (utleverer) (HIS 80814) ​'
                },
                {
                    standardId: 163,
                    standardName: '​M09.3 Forespørsel om nedlasting av resept (HIS 80814) ​'
                },
                {
                    standardId: 164,
                    standardName: 'M09.4 Nedlasting av resept (HIS 80814) ​​'
                },
                {
                    standardId: 165,
                    standardName: 'M9.5 – Forespørsel om tilgjengelige resepter på pasient (HIS 80812)'
                },
                {
                    standardId: 166,
                    standardName: 'M9.6 – Reseptliste (rekvirent) (HIS 80812) ​'
                },
                {
                    standardId: 167,
                    standardName: 'M09.7 - Forespørsel om utleveringer på resept (HIS 80812)'
                },
                {
                    standardId: 168,
                    standardName: 'M9.8 - Utleveringer på resept (HIS 80812)​'
                },
                {
                    standardId: 169,
                    standardName: 'M9.11 Forespørsel om varer i bruk (HIS 80816) ​​'
                },
                {
                    standardId: 170,
                    standardName: 'M9.12 Nedlasting av varer i bruk (HIS 80816) ​​'
                },
                {
                    standardId: 171,
                    standardName: 'M9.21 Hent endrede multidosepasienter (HIS 80816) ​​'
                },
                {
                    standardId: 172,
                    standardName: 'M9.22 Endrede multidosepasienter (HIS 80816)​​​'
                },
                {
                    standardId: 173,
                    standardName: 'M10 Utleveringsrapport reseptformidler (HIS 80813) ​​'
                },
                {
                    standardId: 174,
                    standardName: 'M12 Søknadssvar – Individuell søknad om refusjon til HELFO (HIS 80810)​'
                },
                {
                    standardId: 175,
                    standardName: '​M14 Søknad til SLV (HIS 80811) ​'
                },
                {
                    standardId: 176,
                    standardName: '​M15 Søknadssvar fra SLV (HIS 80811) ​'
                },
                {
                    standardId: 177,
                    standardName: '​M18 Oppgjørskrav (HIS 80815)'
                },
                {
                    standardId: 178,
                    standardName: 'M20 Notifisering (HIS 80813) ​​'
                },
                {
                    standardId: 179,
                    standardName: 'M21 Ekspederingsanmodning (HIS 80809) ​​'
                },
                {
                    standardId: 180
                    ,standardName: 'M22 Oppgjørsresultat (HIS 80815) ​​'
                },
                {
                    standardId: 181,
                    standardName: 'M23 Utbetaling (HIS 80815) ​​'
                },
                {
                    standardId: 182,
                    standardName: 'M24.1 Samtykke (HIS 80812)​'
                },
                {
                    standardId: 183,
                    standardName: 'M24.2 Svar på samtykke (HIS 80812) ​​'
                },
                {
                    standardId: 184,
                    standardName: 'M25.1 Legemidler i bruk (HIS 80816)​​'
                },
                {
                    standardId: 185,
                    standardName: 'M25.2 Legemidler i bruk - forespørsel om endring (HIS 80816) ​'
                },
                {
                    standardId: 186,
                    standardName: '​M25.3 Legemidler i bruk - utleveringsmelding (HIS 80816) ​'
                },
                {
                    standardId: 187,
                    standardName: '​M27.1 Registrering av multidoseansvarlig (HIS 80816) ​'
                },
                {
                    standardId: 188,
                    standardName: '​M27.2 Svar på registrering av multidoseansvarlig (HIS 80816) ​'
                },
                {
                    standardId: 189,
                    standardName: 'M28 Endring av multidoselege (HIS 80816)  '
                },
                {
                    standardId: 190,
                    standardName: '​M30 FEST-meldingen (HIS 80818) ​'
                }
            ]
        }

    ];
})();