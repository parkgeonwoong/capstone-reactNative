<FullScreen>
  <Image
    source={require("../assets/logo.png")}
    style={styles.boxImage}
    resizeMode="contain"
  />
  <View style={styles.boxForm}>
    <TextInput
      style={styles.formInput}
      onChangeText={(textId) => setId(textId)}
      placeholder="아이디"
      onSubmitEditing={() => {
        refPass.current.focus();
      }}
      blurOnSubmit={false}
    />
    <TextInput
      style={styles.formInput}
      onChangeText={(textPass) => setPass(textPass)}
      placeholder="비밀번호"
      secureTextEntry
      ref={refPass}
      blurOnSubmit={false}
    />

    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        handleSubmitBtn();
      }}
    >
      <Text style={styles.text}>로그인</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        navigate("SignUp");
      }}
    >
      <Text style={styles.text}>회원가입</Text>
    </TouchableOpacity>
  </View>
</FullScreen>;
