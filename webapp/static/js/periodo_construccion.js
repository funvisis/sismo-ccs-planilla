
(function($) {

    function desaparecer_opciones (opciones){



        for (i=0;i<opciones.length;i++)
        {

            $('.'+opciones[i]).hide();
            $('#'+opciones[i]).hide();


        }

    }

    function aparecer_opciones (opciones){


        for (i=0;i<opciones.length;i++)
        {

            $('.'+opciones[i]).show();
            $('#'+opciones[i]).show();

        }

    }


    $(document).ready(function($) {

        $('<label id="fecha_inferida" class="required" style="margin-left: 55%"> Fecha Inferida </label>').insertAfter($("#id_anio_construccion_set-0-anio"));

        opciones=["fecha_inferida"];
        desaparecer_opciones(opciones);
        opciones=["field-anio_inici", "field-anio_fin","field-fecha_inf"];
        desaparecer_opciones(opciones);
        opciones=["field-periodo"];
        aparecer_opciones(opciones);
        inferido = 'Año: * ';
        // Para el manejo de los distintos periodos
        $('#id_periodo').change(function() {
            periodo = $('#id_periodo').val();
            opciones=["field-anio_inici", "field-anio_fin"];
            desaparecer_opciones(opciones);
            if (periodo == 1){


                opciones=["field-anio_inici"];
                aparecer_opciones(opciones);

            }
            else{
                if (periodo == 2){


                    opciones=["field-anio_inici", "field-anio_fin",];
                    aparecer_opciones(opciones);

                }
                if (periodo == 3){


                    opciones=[ "field-anio_fin",];
                    aparecer_opciones(opciones);

                }
                else{


                    opciones=["field-periodo"];
                    aparecer_opciones(opciones);

                }
            }
        });


        $('#id_anio_construccion_set-0-anio').change(function() {


            $.get('/periodo_given_year/'+this.value, function(data) {

                id_periodo = data['id'];

                 $('#id_anio_construccion_set-0-periodo').children('option').each(function () {

                    if ($(this).val() == id_periodo){

                        $(this).attr('selected','selected');
                        $('input[name=anio_construccion_set-0-fecha_inf]').attr('checked', false);
                        opciones=["field-fecha_inf","fecha_inferida"];
                        desaparecer_opciones(opciones);
                       // $('label[for="id_anio_construccion_set-0-anio"]').text( inferido);


                    }

                });


            });



        });

        $('#id_anio_construccion_set-0-periodo').change(function() {

            value = $(this).children('option').filter(":selected").val();

            $.get('/year_given_periodo/'+value, function(data) {

                year= data['year'];

                $('#id_anio_construccion_set-0-anio').val(year);
                $('input[name=anio_construccion_set-0-fecha_inf]').attr('checked', true);
                $('input[name=anio_construccion_set-0-fecha_inf]').attr('disable', 'disable');
//                opciones=["field-fecha_inf"];
//                aparecer_opciones(opciones);

               // $('label[for="id_anio_construccion_set-0-anio"]').text( inferido+'(I)');

                opciones=["fecha_inferida"];
                aparecer_opciones(opciones);

            });

        });





    });




})(django.jQuery);










