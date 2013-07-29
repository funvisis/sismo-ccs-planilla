
(function($) {

    var uso = 0;
    var adosamiento = 0;
    var adosamiento2 = 0;
    var ladera =0;
    var base =0;

    function desactivar_opciones (opciones){


        for (i=0;i<opciones.length;i++)
        {

            $('#'+opciones[i]).attr('disabled','disabled');


        }

    }

    function activar_opciones (opciones){


        for (i=0;i<opciones.length;i++)
        {

            $('#'+opciones[i]).removeAttr('disabled');

        }

    }

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

    function validar_al_menos_uno_seleccionado(referencia_div, excluir){

        counter = 0;
        zero_counter = 0;
        $(referencia_div).find('input[type=checkbox]').each(function () {


            name = this.name;
            if (name.search(excluir) ==-1){

                val = (this.checked ? "1" : "0");
                counter = counter +1;
                if (val==0){

                    zero_counter=zero_counter+1;

                }



            }


        });
        if (zero_counter==counter){

           return false;
        }
        else{

            return true;

        }


    }

    function validar_uso_especifico(){


        if (uso==1){

            val = $('#id_uso_set-0-otro_uso').val();


            if (val.length==0){

                //alert('Debe especificar el uso, en la seccion: Uso de la edificación;');
                error('Debe especificar el uso','#uso_set-0');
                return false;
            }
            else{

                return true;
            }
        }
        else{

            return true;
        }
    }

    function validar_separacion_edificio(){


        if ((adosamiento==1) || (adosamiento2==1)){

            val = $('#id_irregularidad_set-0-sep_edif').val();



            if (val==""){

                //alert('Debe especificar la separacion entre los edificios en la sección: Irregularidades');
                error('Debe especificar la separacion entre los edificios','#irregularidad_set-0');
                return false;
            }
            else{

                return true;
            }
        }
        else{

            return true;
        }
    }

    function validar_ladera(){


        if ((ladera==1)){



            val = $('#id_condicion_terreno_set-0-pend_terr').children('option').filter(":selected").text();


            if (val=='---------'){

                //alert('Debe especificar la pendiente del terreno en la sección: Condición Terreno');
                error('Debe especificar la pendiente del terreno','#condicion_terreno_set-0');
                return false;
            }

            val = $('#id_condicion_terreno_set-0-l_m_ladera').children('option').filter(":selected").text();

            if (val=='---------'){

                //alert('Debe especificar la localización del terreno en la sección: Condición Terreno');
                error('Debe especificar la localización del terreno','#condicion_terreno_set-0');
                return false;
            }
            else{

                return true;
            }
        }
        else{

            return true;
        }
    }

    function validar_base(){


        if ((base==1)){



            val = $('#id_condicion_terreno_set-0-pend_talud').children('option').filter(":selected").text();


            if (val=='---------'){

                //alert('Debe especificar la pendiente del talud en la sección: Condición Terreno');
                error('Debe especificar la pendiente del talud','#condicion_terreno_set-0');

                return false;
            }

            val = $('#id_condicion_terreno_set-0-sep_talud').children('option').filter(":selected").text();

            if (val=='---------'){

                //alert('Debe especificar la separación del talud en la sección: Condición Terreno');
                error('Debe especificar la separación del talud','#condicion_terreno_set-0');
                return false;
            }
            else{

                return true;
            }
        }
        else{

            return true;
        }
    }

    function alinear_opciones(referencia_div, excluir){

        $(referencia_div).find('input[type=checkbox]').each(function () {


            name = $(this).closest("div").attr("class");

            if (name.search(excluir) ==-1){
                //alert(name);
                $(this).closest("div").css( "width", "80px" );

                if (name.search('field-t_o_manana')!=-1)
                {
                    $('<label for="id_capacidad_ocupacion_set-__prefix__-t_o_manana" class="required" style="left:-120px; width: 140px;">Turno Ocupación: </label>').insertBefore($(this).closest("div"));



                }




            }


        });




    }

    function error(error, referencia_div){

        mensaje ='<ul class="errorlist"><li>'+error+'</li></ul>';

        $(mensaje).insertBefore($(referencia_div));

    }


    $(document).ready(function($) {


        if ($(".field-foto_facha").find("a").attr("href") != undefined){

            file_path = $(".field-foto_facha").find("a").attr("href").split('/');
            len =   $(".field-foto_facha").find("a").attr("href").split('/').length -1;


            $('<img src="/media/'+file_path[len]+'"/> <br/>').insertBefore($(".field-foto_facha").find("a"));

        }
        if ($(".field-pla_esca").find("a").attr("href") != null){

            file_path = $(".field-pla_esca").find("a").attr("href").split('/');
            len =   $(".field-pla_esca").find("a").attr("href").split('/').length -1;
            $('<br> <p class="required file-upload">Descargar el archivo: <a href="/media/'+file_path[len]+'">'+file_path[len]+' </a> </p> <br/>').insertAfter($("#id_anexo_set-0-pla_esca"));

        }






        $('#id_irregularidad_set-0-sep_edif').closest("div").hide();
        alinear_opciones('#capacidad_ocupacion_set-group .inline-related','__prefix__');

        $('.inline-group h2').each(function () {


            val = $(this).html().toLowerCase();

            val2  = val[0].toUpperCase() + val.slice(1);

            $(this).html(val2);


        });// Manejo de la capitalizacion para los titulos en el admin

        $("fieldset:contains('Información personal')").hide(); // Esconder los campos de info personal en el admin de usuarios.

        $('.required').each(function () {


            val = $(this).html();

            val2  = val + ' <span style="color:red;">*</span> ' ;

            $(this).html(val2);






        });// Asterisco rojo para los cambios requeridos.

        opciones=["field-otro_uso"];
        desaparecer_opciones(opciones);

        $('#id_uso_set-0-u_otros').change(function() {

            val = (this.checked ? "1" : "0");

            uso =val;
            if (val==0){

                opciones=["field-otro_uso"];
                desaparecer_opciones(opciones);

            }
            if(val==1){

                opciones=["field-otro_uso"];
                aparecer_opciones(opciones);

            }


        }); // Si se selecciona opción otro uso, aparece el campo para especificar el uso.


        $('#id_irregularidad_set-0-ados_los_l').change(function() {


            val = (this.checked ? "1" : "0");

            adosamiento =val;
            if(val==1)
                $('#id_irregularidad_set-0-sep_edif').closest("div").show();
            if((adosamiento2==0) && (adosamiento==0))
                $('#id_irregularidad_set-0-sep_edif').closest("div").hide();



        }); // Si se selecciona adosamiento

        $('#id_irregularidad_set-0-ados_los_c').change(function() {



            val = (this.checked ? "1" : "0");

            adosamiento2 =val;

            if(val==1)
                $('#id_irregularidad_set-0-sep_edif').closest("div").show();
            if((adosamiento2==0) && (adosamiento==0))
                $('#id_irregularidad_set-0-sep_edif').closest("div").hide();



        }); // Si se selecciona adosamiento



        $('#id_condicion_terreno_set-0-forma_terr').change(function() {

            value = $(this).children('option').filter(":selected").text();

            ladera =0;
            base = 0;
            if (value =='Ladera'){

                ladera =1;
            }

            if (value =='Base'){

                base =1;
            }

            if (value =='Cima'){

                base =1;
            }

        });
        // validacion de twitter


        // validacion de del combo de los tipos estructurales
        $("#tipo_estructural_set-group").find('input[type=checkbox]').change(function() {


            $('#id_tipo_estructural_set-0-tipo_predomi').find('option').remove() ;

            $("#tipo_estructural_set-group").find('input[type=checkbox]').each(function () {

                valor_check = (this.checked ? "1" : "0");

                id_check = this.id;


                if (valor_check==1){


                    label =$('label[for='+id_check+']').text();
                    if (label.indexOf("(PCA)") >= 0){

                        $('#id_tipo_estructural_set-0-tipo_predomi').append('<option value="1">1. PCA</option>');

                    }

                    if (label.indexOf("(PCAP)") >= 0){

                        $('#id_tipo_estructural_set-0-tipo_predomi').append('<option value="2">2. PCAP</option>');

                    }

                    if (label.indexOf("(MCA2D)") >= 0){

                        $('#id_tipo_estructural_set-0-tipo_predomi').append('<option value="3">3. MCA2D</option>');

                    }

                    if (label.indexOf("(MCA1D)") >= 0){

                        $('#id_tipo_estructural_set-0-tipo_predomi').append('<option value="4">4. MCA1D</option>');

                    }

                    if (label.indexOf("(PA)") >= 0){

                        $('#id_tipo_estructural_set-0-tipo_predomi').append('<option value="5">5. PA</option>');

                    }

                    if (label.indexOf("(PAPT)") >= 0){

                        $('#id_tipo_estructural_set-0-tipo_predomi').append('<option value="6">6. PAPT</option>');

                    }

                    if (label.indexOf("(PAD)") >= 0){

                        $('#id_tipo_estructural_set-0-tipo_predomi').append('<option value="7">7. PAD</option>');

                    }

                    if (label.indexOf("(PAC)") >= 0){

                        $('#id_tipo_estructural_set-0-tipo_predomi').append('<option value="8">8. PAC</option>');

                    }

                    if (label.indexOf("(PRE)") >= 0){

                        $('#id_tipo_estructural_set-0-tipo_predomi').append('<option value="9">9. PRE</option>');

                    }

                    if (label.indexOf("(MMC)") >= 0){

                        $('#id_tipo_estructural_set-0-tipo_predomi').append('<option value="10">10. MMC</option>');

                    }

                    if (label.indexOf("(MMNC)") >= 0){

                        $('#id_tipo_estructural_set-0-tipo_predomi').append('<option value="11">11. MMNC</option>');

                    }

                    if (label.indexOf("(PMBC)") >= 0){

                        $('#id_tipo_estructural_set-0-tipo_predomi').append('<option value="12">12. PMBC</option>');

                    }

                    if (label.indexOf("(VB)") >= 0){

                        $('#id_tipo_estructural_set-0-tipo_predomi').append('<option value="13">13. VB</option>');

                    }

                    if (label.indexOf("(VCP)") >= 0){

                        $('#id_tipo_estructural_set-0-tipo_predomi').append('<option value="14">14. VCP</option>');

                    }

                }

            });

        });



        $('#inspeccion_form').submit(function()
        {


            // Validacion de " Al menos uno" para los campos booleanos multiopcion.
           if (!validar_al_menos_uno_seleccionado('#uso_set-group .inline-related','__prefix__')){

               //alert('Debe seleccionar al menos una opción en la sección: Usos de la edificación');

               alert('Se detectaron errores en la planilla');

               error('Debe seleccionar al menos una opción','#uso_set-0');


               return false;
           }


           if (!validar_al_menos_uno_seleccionado('#tipo_estructural_set-group .inline-related','__prefix__')){

                //alert('Debe seleccionar al menos una opción en la sección: Tipo Estructural');
               alert('Se detectaron errores en la planilla');

               error('Debe seleccionar al menos una opción','#tipo_estructural_set-0');
                return false;
            }


            if (!validar_al_menos_uno_seleccionado('#capacidad_ocupacion_set-group .inline-related','__prefix__')){

                //alert('Debe seleccionar al menos una opción en la sección: Capacidad de ocupacion');
                alert('Se detectaron errores en la planilla');
                error('Debe seleccionar al menos una opción','#capacidad_ocupacion_set-0');
                return false;
            }


            if (!validar_uso_especifico()){

                return false;
            }

            if (!validar_separacion_edificio()){

                return false;
            }

            if (!validar_ladera()){

                return false;
            }

            if (!validar_base()){

                return false;
            }




        });

        //validacion en el admin para la condicion del terreno.
        $('#id_forma_terr').change(function() {
            forma_terreno = $('#id_forma_terr').val();
            if (forma_terreno == 1){
                opciones=["id_pend_terr","id_l_m_ladera","id_pend_talud", "id_sep_talud"];
                desaparecer_opciones(opciones);
            }
            else{
                if (forma_terreno == 2){
                    opciones=["id_pend_talud", "id_sep_talud"];
                    desaparecer_opciones(opciones);
                    opciones=["id_pend_terr","id_l_m_ladera"];
                    aparecer_opciones(opciones);
                }
                else{
                    opciones=["id_pend_terr","id_l_m_ladera"];
                    desaparecer_opciones(opciones);
                    opciones=["id_pend_talud","id_sep_talud"];
                    aparecer_opciones(opciones);
                }
            }
        });

        //validacion en el admin para el periodo de construccion.
        opciones=["field-anio_inici", "field-anio_fin", "field-fecha_infer"];
        desaparecer_opciones(opciones);
        opciones=["field-periodo"];
        aparecer_opciones(opciones);
        $('#id_periodo').change(function() {
            periodo = $('#id_periodo').val();
            opciones=["field-anio_inici", "field-anio_fin", "field-fecha_infer"];
            desaparecer_opciones(opciones);
            if (periodo == 1){

                opciones=["field-anio_inici", "field-anio_fin", "field-fecha_infer"];
                desaparecer_opciones(opciones);
                opciones=["field-anio_inici"];
                aparecer_opciones(opciones);

            }
            else{
                if (periodo == 2){

                    opciones=["field-anio_inici", "field-anio_fin", "field-fecha_infer"];
                    desaparecer_opciones(opciones);
                    opciones=["field-anio_inici", "field-anio_fin",];
                    aparecer_opciones(opciones);

                }
                if (periodo == 3){

                    opciones=["field-anio_inici", "field-anio_fin", "field-fecha_infer"];
                    desaparecer_opciones(opciones);
                    opciones=[ "field-anio_fin",];
                    aparecer_opciones(opciones);

                }
                else{

                }
            }
        });

        //validacion en el admin para el periodo de construccion.
        opciones=["field-anio_inici", "field-anio_fin", "field-fecha_infer"];
        desaparecer_opciones(opciones);
        $('#id_periodo_construccion_set-0-periodo').change(function() {

            opciones=["field-anio_inici", "field-anio_fin", "field-fecha_infer"];
            desaparecer_opciones(opciones);
            periodo = $('#id_periodo_construccion_set-0-periodo').val();
            if (periodo == 1){

                opciones=["field-anio_inici", "field-anio_fin", "field-fecha_infer"];
                desaparecer_opciones(opciones);
                opciones=["field-anio_inici"];
                aparecer_opciones(opciones);

            }
            else{
                if (periodo == 2){

                    opciones=["field-anio_inici", "field-anio_fin", "field-fecha_infer"];
                    desaparecer_opciones(opciones);
                    opciones=["field-anio_inici", "field-anio_fin",];
                    aparecer_opciones(opciones);

                }
                if (periodo == 3){

                    opciones=["field-anio_inici", "field-anio_fin", "field-fecha_infer"];
                    desaparecer_opciones(opciones);
                    opciones=[ "field-anio_fin",];
                    aparecer_opciones(opciones);

                }
                else{

                }
            }
        });

        //validacion en el admin para la condicion del terreno.
        opciones=["field-pend_terr","field-l_m_ladera","field-pend_talud", "field-sep_talud"];
        desaparecer_opciones(opciones);
        $('#id_condicion_terreno_set-0-forma_terr').change(function() {
            forma_terreno = $('#id_condicion_terreno_set-0-forma_terr').val();

            if (forma_terreno == 1){
                opciones=["field-pend_terr","field-l_m_ladera","field-pend_talud", "field-sep_talud"];
                desaparecer_opciones(opciones);
            }

            if (forma_terreno == 2){

                opciones=["field-pend_talud", "field-sep_talud"];
                desaparecer_opciones(opciones);
                opciones=["field-pend_terr","field-l_m_ladera"];
                $('label[for="id_condicion_terreno_set-0-pend_terr"]').html('Pendiente del terreno: <span style="color:red;">*</span>');
                $('label[for="id_condicion_terreno_set-0-pend_terr"]').attr('class', 'required');
                $('label[for="id_condicion_terreno_set-0-l_m_ladera"]').html('Localizada sobre la mitad superior de la ladera: <span style="color:red;">*</span>');
                $('label[for="id_condicion_terreno_set-0-l_m_ladera"]').attr('class', 'required');
                aparecer_opciones(opciones);
            }
            if ((forma_terreno == 3) || (forma_terreno == 4) ){

                opciones=["field-pend_terr","field-l_m_ladera"];
                desaparecer_opciones(opciones);
                opciones=["field-pend_talud", "field-sep_talud"];
                $('label[for="id_condicion_terreno_set-0-pend_talud"]').html('Pendiente del talud: <span style="color:red;">*</span>');
                $('label[for="id_condicion_terreno_set-0-pend_talud"]').attr('class', 'required');
                $('label[for="id_condicion_terreno_set-0-sep_talud"]').html('Separación del talud: <span style="color:red;">*</span>');
                $('label[for="id_condicion_terreno_set-0-sep_talud"]').attr('class', 'required');
                aparecer_opciones(opciones);
            }


        });
    });


})(django.jQuery);


$(document).ready(function(){
    $("#id_observacion_set-0-observacion").charCount();
});




